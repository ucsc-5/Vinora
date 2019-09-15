import { Injectable } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user:  User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
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
      var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      this.router.navigate(['/retailer/1']);
  }


  async register(email: string, password: string) {
    console.log(email,password);
     errorCode: String
     errorMessage: String
   
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      this.errorCode=error.errorCode;

      
    });



   
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
