import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { Retailer } from 'src/app/service/retailer.model';

import { AngularFireFunctions } from '@angular/fire/functions';

import { map } from 'rxjs/operators';
// import * as admin from 'firebase-admin';

// admin.initializeApp();
import { from } from 'rxjs';
import { idTokenResult } from 'src/app/auth-guard';

@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  state = 'new';
  type = 'retailer';

  loggined = false;


  constructor(private fns: AngularFireFunctions,public afAuth: AngularFireAuth,private router: Router,private route:ActivatedRoute, private authService: AuthenticationService,private retailerService:RetailerService) {
   
    

  }

  ngOnInit() {
  }

  async register(form: NgForm){

    const value =form.value ;
    this.authService.register(value.email,value.password,this.type);

    const uid=this.authService.user.uid;
    const userEmail = value.email;
    // const claim = await admin.auth().get
    const retailer = new Retailer(value.shopname,value.email,value.address,value.tel,uid);
    // console.log(retailer);
    this.retailerService.createRetailer(retailer);
    const callable = this.fns.httpsCallable('addRetailerRole');
    callable({email:userEmail}).subscribe(
      response=>{
        console.log(response);
      }
    )
    
    
    
    // this.afAuth.auth.currentUser.getIdTokenResult().then(
    //   (idTokenResult) =>{
    //     if(idTokenResult.claims.retailer){
    //       console.log(idTokenResult.claims.retailer)
    //     }else{
    //       console.log("non claim");
    //     }
    //   }
    // ).catch((error)=>{
    //   console.log(error);
    // })
 
    
    // this.loggined = !this.loggined;
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


}
