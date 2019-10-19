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
import { idTokenResult } from '../auth-guard';


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
      var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
        if(idTokenResult.claims.retailer){
          this.router.navigate(['/retailer/',this.user.uid]);
        }else if(idTokenResult.claims.manager){
          this.router.navigate(['/manager/',this.user.uid]);
        }else if(idTokenResult.claims.admin){
          this.router.navigate(['/admin/',this.user.uid]);
        }else if(idTokenResult.claims.stockManager){
          this.router.navigate(['/stockManager/',this.user.uid]);
        }
        else{
          console.log('another uSer')
        }
      })      
  }
  async register(email: string, password: string,type: string) {
    console.log(email,password);
    // this.loginUser = new LoginUser(type,this.user.uid,email);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(()=>{
        // this.userServise.createUser(this.loginUser);
        
    }
    ).catch(
        error=> console.log(error)
      );  
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
