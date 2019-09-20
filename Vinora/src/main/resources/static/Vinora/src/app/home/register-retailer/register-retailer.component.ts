import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { Retailer } from 'src/app/service/retailer.model';
import { map } from 'rxjs/operators';

;


@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  state = 'new';
  type = 'retailer';

  constructor(public afAuth: AngularFireAuth,private router: Router,private route:ActivatedRoute, private authService: AuthenticationService,private retailerService:RetailerService) {
    
  }

  ngOnInit() {
  }



  register(form: NgForm){

    const value =form.value ;
    this.authService.register(value.email,value.password,this.type);

    // const uid = this.afAuth.authState.pipe(
    //   map(authState=>{
    //     if(!authState){
    //       return null;
    //     }else{
    //       return authState.uid;
    //     }
    //   })
    // );

    const uid=this.authService.user.uid;
    const retailer = new Retailer(value.shopname,value.email,value.address,value.tel,uid);
    console.log(retailer);
    this.retailerService.createRetailer(retailer);
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


}
