import { Component, OnInit, Injectable,Inject } from '@angular/core';

import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@Injectable()


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  showSpinner=false;
  loginForm: FormGroup;
  hide = true;
  message: string
  // // email:string;
  // emailFeild = new FormControl('', [Validators.required, Validators.email]);
  // passwordFeild = new FormControl(null,[Validators.required,Validators.min(6)]);

  constructor(public dialog: MatDialog,public afAuth: AngularFireAuth, private authService : AuthenticationService,private db: AngularFireDatabase) {
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
  signUp() {
      const email=this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(email);
      console.log(password);
      
      
      this.authService.logout();
    //   this.authService.login(email,password).then(res=>{
    //   // setTimeout(() => {
    //   //   this.message=null;
    //   //  }, 2000);
       
    //  }).catch(error=>{
    //   this.message="Please check your email and password again!!"
    //    console.log(" this is the error  "+error);
    //  })
    this.showSpinner=true;

    // this.authService.login('admin@gmail.com','123123'); //for admin
    //  this.authService.login('chamod999@gmail.com','0714954149'); //for stock manager
    // this.authService.login('ret1@gmail.com','123123'); //for retailer
    // this.authService.login('vigith@gmail.com','123123'); //for retailer
    // this.authService.login('vigith@gmail.com','123123'); //for retailer
    // this.authService.login('royalvintage@gmail.com','654321'); //for Manager
   
    // this.authService.login('udulaindunil@gmail.com','#Udula@1997'); //for stock manager Manager email verified
    this.authService.login('2017cs162@stu.ucsc.cmb.ac.lk','#Udula@1997'); //for stock manager Manager email verified

        // this.authService.login('2017cs162@stu.ucsc.cmb.ac.lk','#Udula@1997'); //for Manager
        //  this.authService.login('udulacompany@gmail.com','#Vinora@123'); //for Manager
    this.showSpinner=false;
    console.log(this.authService.user.uid); 
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



