import { Component, OnInit, Injectable } from '@angular/core';

import {FormControl, Validators, NgForm} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthenticationService } from 'src/app/service/authentication.service';


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
  constructor(public afAuth: AngularFireAuth, private authService : AuthenticationService) {
  }




  signUp(form: NgForm) {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); this is for login with gmail
    const value = form.value;
    this.authService.login(value.email,value.password);    
  }

  logout() {
    // this.afAuth.auth.signOut(); sign out with gmail
    this.authService.logout();
  }


   
  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  

}
