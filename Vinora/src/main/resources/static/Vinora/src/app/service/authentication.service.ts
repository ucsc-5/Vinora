import { Injectable } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { LoginUser } from './login-user';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user:  User;
  
  loginUser: LoginUser;

  registerUserId: string
  
  // loginUser : Observable<LoginUser|null>;

  constructor(  private route: ActivatedRoute, 
                private  afAuth:  AngularFireAuth, 
                public  router:  Router, 
                private http:HttpClient,
                private userServise:UserService, 
                private db: AngularFireDatabase) {

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
    await this.afAuth.auth.signOut();
      var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(()=>{
        this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
          if(idTokenResult.claims.retailer){
            this.router.navigate(['/retailer/',this.user.uid]);
          }else if(idTokenResult.claims.manager){
            this.router.navigate(['/manager/',this.user.uid]);
          }else if(idTokenResult.claims.admin){
            this.router.navigate(['/admin/',this.user.uid]);
          }else if(idTokenResult.claims.stockManager){
            this.router.navigate(['/stockManager/',this.user.uid]);
          }else if(idTokenResult.claims.salesRef){
            this.router.navigate(['/salesRepresntative/',this.user.uid]);
          }
          else{
            this.router.navigate(['/']);
            console.log("another user");
            
          }
        })   
      }).catch(function(error){
        var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Eroor Msg"  + errorMessage);
      });
         
  }
  async register(email: string, password: string) {
    console.log("regsiteratons");
     this.afAuth.auth.createUserWithEmailAndPassword(email, password)
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
  this.router.navigate(['']);
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
