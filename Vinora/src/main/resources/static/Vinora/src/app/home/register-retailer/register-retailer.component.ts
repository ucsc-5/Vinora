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




@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  selectedFiles: FileList;
  state = 'new';
  type = 'retailer';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  loggined = false;

  latitude = 6.902196;
  longitude = 79.861133;
  locationChosen = false;

  retailer : Observable<RetailerId[]>;
  private retailerCollection: AngularFirestoreCollection<RetailerId>;

  constructor(
                private fns: AngularFireFunctions,
                private _formBuilder: FormBuilder,
                public afAuth: AngularFireAuth,
                private router: Router,
                private route:ActivatedRoute, 
                private authService: AuthenticationService,
                private retailerService:RetailerService,
                private readonly afs: AngularFirestore,
                private storage: AngularFireStorage) {

                  this.retailerCollection = afs.collection<RetailerId>('retailers');
   
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      shopName: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]]  
    });
    
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]]
    });   

  }
  
  async register(){
    const email : string = this.secondFormGroup.value['email'];
    const password = this.firstFormGroup.value['password'];
    const shopName = this.firstFormGroup.value['shopName'];
    const address = this.secondFormGroup.value['address'];
    const contactNumber = this.secondFormGroup.value['contactNumber'];
    const state = "0";
    const url ="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg";
    const latitude = this.longitude
    const longitude = this.longitude
    
    const coord = new firebase.firestore.GeoPoint(latitude,longitude);

    this.authService.register(email,password,this.type).then(
      response=>{
        console.log(response);
        const callable = this.fns.httpsCallable('addRole');

        callable({email:email,role:this.type}).subscribe(
          (response)=>{
               console.log(response);
          },
          ()=>{},
          ()=>{
            this.authService.login(email,password).then(()=>{
            const retailerId = this.afAuth.auth.currentUser.uid;
    
            const retailer: Retailer= {shopName,email,address,contactNumber,state,url,retailerId,coord};
            // this.retailerCollection.doc(id). set(retailer);
            // this.companyCollection.doc(uid).set(company1);
            this.retailerCollection.doc(retailerId).set(retailer).then(
              res=>{
                console.log(" Retailer is set "+res);
              }
            ).catch(error=>{
              console.log(" error of seting retailer "+ error);
            });
          }
        )
       }
      )
      }
    ).catch(error => {
           switch (error.code) {
              case 'auth/email-already-in-use':
                console.log(`Email address ${email} already in use.`);
              case 'auth/invalid-email':
                console.log(`Email address ${email} is invalid.`);
              case 'auth/operation-not-allowed':
                console.log(`Error during sign up.`);
              case 'auth/weak-password':
                console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
              default:
                console.log("this is the default error message "+error.message);
            }
        });
}
      
      
      
      // return uploadTask.percentageChanges();

 
  

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


}
