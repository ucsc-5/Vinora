import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RetailerService, RetailerId, Retailer } from 'src/app/service/retailer.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { finalize } from 'rxjs/operators';
import { CompanyService, CompanyId } from 'src/app/service/company.service';




@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  selectedFiles: FileList;
  state = 'new';
  type = 'retailer';
  hide = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  loggined = false;

  latitude = 6.902196;
  longitude = 79.861133;
  locationChosen = false;

  message


  retailer : Observable<RetailerId[]>;
  private retailerCollection: AngularFirestoreCollection<RetailerId>;
  private companyCollection : AngularFirestoreCollection<CompanyId>;

  constructor(
                private fns: AngularFireFunctions,
                private _formBuilder: FormBuilder,
                public afAuth: AngularFireAuth,
                private router: Router,
                private route:ActivatedRoute, 
                private authService: AuthenticationService,
                private retailerService:RetailerService,
                private readonly afs: AngularFirestore,
                private storage: AngularFireStorage,
                private companyService:CompanyService) {

                  this.retailerCollection = afs.collection<RetailerId>('retailers');
   
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      shopName: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]] ,
      confirmPassword: ['', [Validators.required,Validators.minLength(6)]]  

    });
    
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]]
    });   

  }
  
  async register(){

    console.log(this.secondFormGroup);
    console.log(this.firstFormGroup);
    
    const email : string = this.secondFormGroup.value['email'];
    const password = this.firstFormGroup.value['password'];
    const confirmPassword = this.firstFormGroup.value['confirmPassword'];
    const shopName = this.firstFormGroup.value['shopName'];
    const address = this.secondFormGroup.value['address'];
    const contactNumber = this.secondFormGroup.value['contactNumber'];
    const state = 1;
    const url ="https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
    const latitude = this.longitude
    const longitude = this.longitude
    
    const coord = new firebase.firestore.GeoPoint(latitude,longitude);

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res=>{
      if(res.user.email){
          
        const callable = this.fns.httpsCallable('addRole')
        callable({email:email,role:this.type}).subscribe(
                (response)=>{
                     console.log(response);
                },
                ()=>{},
                ()=>{
                  this.authService.login(email,password).then(x=>{
                    const retailerId = this.afAuth.auth.currentUser.uid;
                    const retailer: Retailer= {shopName,email,address,contactNumber,state,url,retailerId,coord};
                    this.retailerCollection.doc(retailerId).set(retailer).then(
                                res=>{
                                  
                                  this.companyService.getAllCompanies().forEach(x=>{
                                    x.forEach(x2=>{
                                      this.retailerCollection.doc(retailerId).collection("notRegCompanies").doc(x2.id).set(x2).then(res1=>{
                                          console.log("Sucsess");
                                        }).catch(error=>{
                                          console.log(error+"this is from frist");
                                        })
                                      this.afs.collection('companies').doc(x2.id).collection('notRegRetailers').doc(retailerId).set(retailer).then(res=>{
                                        console.log("sucsess");
                                      }).catch(error1=>{
                                        console.log(error1+"this is from Second");
                                      })
                                    })
                                  })
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

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  
  onChoseLocation(event){
    console.log(event.coords);
    
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen= true;

    console.log(this.latitude+" lati");
    console.log(this.longitude+" long");

  }

  retry(){
    this.router.navigate([],{relativeTo: this.route})
  }


}
