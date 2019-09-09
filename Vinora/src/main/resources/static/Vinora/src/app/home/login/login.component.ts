import { Component, OnInit, Injectable } from '@angular/core';

import {FormControl, Validators, NgForm} from '@angular/forms';
import { FirebaseAuth, FirebaseApp, AngularFireModule } from '@angular/fire';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';


@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  //email
  email = new FormControl('', [Validators.required, Validators.email]);


  hide = true;
  constructor() {

   }

   
  ngOnInit() {
  }

  signUp(form: NgForm){

    const value = form.value;
    const email = value.email;
    const password = value.password;
    console.log("email"+email+"\n"+"password"+password);
   
    // this.auth.createUserWithEmailAndPassword()
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  

}
