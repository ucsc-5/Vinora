import { Component, OnInit, Injectable,Inject } from '@angular/core';
import { User } from  'firebase';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:  User;
  showSpinner=false;
  loginForm: FormGroup;
  hide = true;
  message: string

  constructor(public  router:  Router,public dialog: MatDialog,public afAuth: AngularFireAuth, private authService : AuthenticationService,private db: AngularFireDatabase) {

  }


  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required])
  })
  
}

  openDialog(): void {
     this.dialog.open(DialogOverviewExampleDialogComponent);
  }
  async signUp() {
      const email=this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(email);
      console.log(password);
      this.authService.logout();
      this.showSpinner=false;
      var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((res)=>{

        this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
          const uid= idTokenResult.claims.user_id;
          console.log(uid+" this is the uid");
          
          if(idTokenResult.claims.retailer){
            this.router.navigate(['/retailer/',uid]);
            return;
          }else if(idTokenResult.claims.manager){
            this.router.navigate(['/manager/',uid]);
            return;
          }else if(idTokenResult.claims.admin){
            this.router.navigate(['/admin/',uid]);
            return;
          }else if(idTokenResult.claims.stockManager){
            this.router.navigate(['/stockManager/',uid]);
            return;
          }else if(idTokenResult.claims.salesRef){
            this.router.navigate(['/salesRepresntative/',uid]);
            return;
          }
          else{
            const uidFromMob=this.afAuth.auth.currentUser.uid
            this.router.navigate(['/retailer/',uidFromMob]);
            console.log("this is the elese part");
            console.log(uidFromMob+"     uidFromMob");            
          }
        }  )   
        
      }).catch(function(error){
        console.log("this is the new error"+error);
        return error.message
      });   
  }

  logout() {
    // this.afAuth.auth.signOut(); sign out with gmail
    this.authService.logout();
  }

  getErrorMessage() {
    return this.loginForm.hasError('required') ? 'You must enter a value' :
        this.loginForm.hasError('email') ? 'Not a valid email' :
            '';
  } 
}



