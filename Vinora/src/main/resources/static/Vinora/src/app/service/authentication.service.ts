import { Injectable } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { LoginUser } from './login-user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user:  User;
  loginUser: LoginUser;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router, private http:HttpClient,private userServise:UserService) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }


  async login(email: string, password: string) {
      var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log(this.user);
  }


  async register(email: string, password: string,type: string) {
    console.log(email,password);
    this.loginUser = new LoginUser(email,type);
    this.userServise.createUser(this.loginUser);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(
        error=> console.log(error)
      );
   
    // this.sendEmailVerification();
  }

async sendEmailVerification() {
  await this.afAuth.auth.currentUser.sendEmailVerification()
}

async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
}

async logout(){
  await this.afAuth.auth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['admin/login']);
}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}

async  loginWithGoogle(){
  await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  this.router.navigate(['admin/list']);
}
   
}
