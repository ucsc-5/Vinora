import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { Retailer } from 'src/app/service/retailer.model';

import { AngularFireFunctions } from '@angular/fire/functions';


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
    const userEmail = value.email;
    const password = value.password;
    this.authService.register(value.email,value.password,this.type);
    const callable = this.fns.httpsCallable('addRole');
     callable({email:userEmail,role:this.type}).subscribe(
      response=>{
        console.log(response);
      },()=>{},
      ()=>{
        this.authService.login(userEmail,password);
        const uid = this.afAuth.auth.currentUser.uid;
        const retailer = new Retailer(value.shopName,value.email,value.address,value.contactNumber,uid)
        this.retailerService.createRetailer(retailer,uid);
      }
    )
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


}
