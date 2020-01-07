import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { CustomPasswordValidator } from 'src/app/shared/custom-password-validator';
import { RetailerService, RetailerId, Retailer } from 'src/app/service/retailer.service';

import { idTokenResult } from '@angular/fire/auth-guard';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register-d-company',
  templateUrl: './register-d-company.component.html',
  styleUrls: ['./register-d-company.component.css']
})
export class RegisterDCompanyComponent implements OnInit {
  private companyCollection: AngularFirestoreCollection<CompanyId>;
  private retailerCollection: AngularFirestoreCollection<RetailerId>;
  companies: Observable<Company[]>;
  companyId: string;
  hide = true;
  type = 'manager';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  loggined = false;

  latitude = 6.902196;
  longitude = 79.861133;
  locationChosen = false;

  message   //this message for the error in the login form
 
  constructor(private authService:AuthenticationService,private readonly afs: AngularFirestore,private retailerService: RetailerService,private afAuth: AngularFireAuth,private _formBuilder: FormBuilder,private fns: AngularFireFunctions,private companyService:CompanyService,private db: AngularFireDatabase, private authServise:AuthenticationService) { 
    this.companyCollection = afs.collection<CompanyId>('companies');
 
    this.companies = this.companyCollection.valueChanges();
    // this.companyId = this.afAuth.auth.currentUser.uid;
  }
  ngOnInit() {

  
    this.firstFormGroup = new FormGroup({

      'companyName': new FormControl(null,[Validators.required]),
      'address': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,
        [ Validators.required,Validators.minLength(6),
          CustomPasswordValidator.patternValidator(/\d/, { hasNumber: true }),
          CustomPasswordValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomPasswordValidator.patternValidator(/[a-z]/, { hasSmallCase: true })
        ]),
      'confirmPassword': new FormControl(null,
        [Validators.required,Validators.minLength(6)])
    })

    

    this.secondFormGroup = new FormGroup({
      'email': new FormControl(null,
        [Validators.email,Validators.required]),
      'managerName': new FormControl(null,
        [Validators.required]),
      'managerNic': new FormControl(null,
        [Validators.required]),
      'tel': new FormControl(null,[Validators.required])
    })
   
  }
  get fval(){
    return this.firstFormGroup.controls;
  }
  get sval(){
    return this.secondFormGroup.controls;
  }
  register(){
    
    const email = this.secondFormGroup.value['email'];
    const password = this.firstFormGroup.value['password'];

    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
      if(res.user.email){
        const callable = this.fns.httpsCallable('addRole')  //this is a firebase function deployed
        callable({email:email,role:this.type}).subscribe(
                (response)=>{
                     console.log(response);
                },
                (error)=>{
                  console.log("this is error of firebase function");
                  
                  console.log(error);
                  
                },
                ()=>{
                  this.authService.login(email,password).then(x=>{
                    const companyId = this.afAuth.auth.currentUser.uid;
                    const address:string=this.firstFormGroup.value['address'];
                    const companyName:string=this.firstFormGroup.value['companyName'];
                    const contactNumber:string=this.secondFormGroup.value['tel'];
                    const email:string=this.secondFormGroup.value['email'];
                    const managerName:string=this.secondFormGroup.value['managerName'];
                    const managerNic:string=this.secondFormGroup.value['managerNic'];
                    const state:string="0";
                    const imagePath:string="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg";
                    const coord = new firebase.firestore.GeoPoint(this.latitude,this.longitude);
                    const company:Company={address,companyName,contactNumber,email,managerName,managerNic,state,imagePath,companyId,coord}
                    this.companyCollection.doc(companyId).set(company).then(
                                res=>{
                                  this.retailerService.getAllRetailers().forEach(res1=>{
                                    res1.forEach(res2=>{
                                        this.companyCollection.doc(companyId).collection('notRegRetailers').doc(res2.id).set(res2).then(res=>{
                                          console.log("Retailers Set");
                                        }
                                        ).catch(error=>{
                                          console.log(error);
                                        });
                                    })
                                  })
                                  console.log(" Manager is set ");
                                }
                              ).catch(error=>{
                                console.log(" error of seting retailer "+ error);
                              });
                  })
                })
                return ""
      }else{
       console.log("not done");
      }
    })
   .catch(error => {
        console.log(error.message);
        this.message=error.message;
   })

  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  onChoseLocation(event){
    console.log(event.coords);
    
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen= true;

    console.log(this.latitude+" lati");
    console.log(this.longitude+" long");

  }
}
