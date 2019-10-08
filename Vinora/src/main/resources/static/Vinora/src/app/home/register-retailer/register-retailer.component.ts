import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { Retailer } from 'src/app/service/retailer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  state = 'new';
  type = 'retailer';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  loggined = false;
  constructor(private fns: AngularFireFunctions,private _formBuilder: FormBuilder,public afAuth: AngularFireAuth,private router: Router,private route:ActivatedRoute, private authService: AuthenticationService,private retailerService:RetailerService) {
   
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      myControl1: ['shopName', Validators.required],
      myControl2: ['', Validators.required]  
    });
    
    this.secondFormGroup = this._formBuilder.group({
      myControl3: ['', Validators.required],
      myControl4: ['', Validators.required],
      myControl5: ['', Validators.required]
    });
    
  }
  
  async register(){
    const userEmail = this.secondFormGroup.value['myControl3'];
    const password = this.firstFormGroup.value['myControl2'];
    this.authService.register(userEmail,password,this.type);
    const callable = this.fns.httpsCallable('addRole');
     callable({email:userEmail,role:this.type}).subscribe(
      response=>{
        console.log(response);
      },()=>{},
      ()=>{
        this.authService.login(userEmail,password);
        const uid = this.afAuth.auth.currentUser.uid;
        const retailer = new Retailer(this.firstFormGroup.value['myControl1'],this.secondFormGroup.value['myControl3'],this.secondFormGroup.value['myControl4'],this.secondFormGroup.value['myControl5'],uid)
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
