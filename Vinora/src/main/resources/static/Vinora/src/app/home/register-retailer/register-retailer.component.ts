import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { RetailerService } from 'src/app/retailer/retailer.service';
import { PendigRetailer } from 'src/app/retailer/pendingRetailer.model';
;


@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  
  // errorMessage = this.authService.errorMessage;
  //  errorMessage :boolean = false;

  constructor(public afAuth: AngularFireAuth,private router: Router,private route:ActivatedRoute, private authService: AuthenticationService,private retailerService:RetailerService) {
    
  }

  ngOnInit() {
  }



  register(form: NgForm){
    const value =form.value ;
    console.log(value);
    this.authService.register(value.email,value.password);
    const retailer = new PendigRetailer(value.shopname,value.email,value.address,value.tel,value.state);
    this.retailerService.storeNewRetailer(retailer).subscribe(
      (response)=>{
        console.log(response);
      }
    );    
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


}
