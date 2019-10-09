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
import { CompanyService } from 'src/app/service/company.service';
import { Company } from 'src/app/service/company.model';

@Component({
  selector: 'app-register-d-company',
  templateUrl: './register-d-company.component.html',
  styleUrls: ['./register-d-company.component.css']
})
export class RegisterDCompanyComponent implements OnInit {
  hide = true;
  type = 'manager';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  loggined = false;
  constructor(private afAuth: AngularFireAuth,private _formBuilder: FormBuilder,private fns: AngularFireFunctions,private companyService:CompanyService,private db: AngularFireDatabase, private authServise:AuthenticationService) { 
    
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required,Validators.minLength(6)]  
    });
    
    this.secondFormGroup = this._formBuilder.group({
      email: ['', Validators.required,Validators.email],
      managerName: ['', Validators.required],
      managerNic: ['', Validators.required],
      tel: ['', Validators.required],
    });
  }

  register(){
    
    const userEmail = this.secondFormGroup.value['email'];
    const password = this.firstFormGroup.value['password'];
    const stock = new Company(this.firstFormGroup.value['companyName'],this.secondFormGroup.value['managerNic'],this.secondFormGroup.value['managerName'],this.secondFormGroup.value['email'],this.firstFormGroup.value['address'],this.secondFormGroup.value['tel'])
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
