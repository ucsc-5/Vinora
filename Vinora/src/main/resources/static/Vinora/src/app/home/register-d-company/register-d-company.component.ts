import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { idTokenResult } from '@angular/fire/auth-guard';
import { CompanyService, Company } from 'src/app/service/company.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-register-d-company',
  templateUrl: './register-d-company.component.html',
  styleUrls: ['./register-d-company.component.css']
})
export class RegisterDCompanyComponent implements OnInit {
  private companyCollection: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;
  hide = true;
  type = 'manager';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  loggined = false;
 
  constructor(private readonly afs: AngularFirestore,private retailerService: RetailerService,private afAuth: AngularFireAuth,private _formBuilder: FormBuilder,private fns: AngularFireFunctions,private companyService:CompanyService,private db: AngularFireDatabase, private authServise:AuthenticationService) { 
    this.companyCollection = afs.collection<Company>('companies');
    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. See the addItem()
    // method below for how to persist the id with
    // valueChanges()
    this.companies = this.companyCollection.valueChanges();
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]]  
    });
    
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      managerName: ['', Validators.required],
      managerNic: ['', Validators.required],
      tel: ['', Validators.required],
    });

   
  }
  get fval(){
    return this.firstFormGroup.controls;
  }
  get sval(){
    return this.secondFormGroup.controls;
  }
  register(){
    
    const userEmail = this.secondFormGroup.value['email'];
    const password = this.firstFormGroup.value['password'];
    this.authServise.register(userEmail,password,this.type).then(()=>{
      const callable = this.fns.httpsCallable('addRole');
    
      callable({email:userEmail,role:this.type}).subscribe(
        response=>{
          console.log(response);
        },()=>{},
        ()=>{
          this.authServise.login(userEmail,password).then(()=>{
            const uid = this.afAuth.auth.currentUser.uid;
            const address:string=this.firstFormGroup.value['address'];
            const companyName:string=this.firstFormGroup.value['companyName'];
            const contactNumber:string=this.secondFormGroup.value['tel'];
            const email:string=this.secondFormGroup.value['email'];
            const managerName:string=this.secondFormGroup.value['managerName'];
            const managerNic:string=this.secondFormGroup.value['managerNic'];
            const state:string="0";
            const imagePath:string="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg";
            const company1:Company={address,companyName,contactNumber,email,managerName,managerNic,state,imagePath}
            this.companyCollection.doc(uid).set(company1);
          }).catch((error)=>{
            console.log(error+" The error from register then login ");
          })
          ;          // this.retailerService.setNotRegisteredCompanies(uid);
        }
      )
    });
      
    
   
        
    /*const stock = new Company(this.firstFormGroup.value['companyName'],this.secondFormGroup.value['managerNic'],this.secondFormGroup.value['managerName'],this.secondFormGroup.value['email'],this.firstFormGroup.value['address'],this.secondFormGroup.value['tel'])
    console.log(stock);
    this.authServise.register(userEmail,password,this.type);
    const callable = this.fns.httpsCallable('addRole');
    
    callable({email:userEmail,role:this.type}).subscribe(
      response=>{
        console.log(response);
      },()=>{},
      ()=>{
        this.authServise.login(userEmail,password);
        const uid = this.afAuth.auth.currentUser.uid;
        this.companyService.createCompany(stock,uid);
        // this.retailerService.setNotRegisteredCompanies(uid);
      }
    )  */


  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}
