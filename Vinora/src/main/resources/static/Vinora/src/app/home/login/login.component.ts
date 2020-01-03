import { Component, OnInit, Injectable,Inject } from '@angular/core';

import {FormControl, Validators, NgForm} from '@angular/forms';
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

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  message: string

  constructor(public dialog: MatDialog,public afAuth: AngularFireAuth, private authService : AuthenticationService,private db: AngularFireDatabase) {
    
    this.size$ = new BehaviorSubject(null);
        this.items$ = this.size$.pipe(
          switchMap(size => 
            this.db.list('/users', ref =>
              size ? ref.orderByKey() : ref
            ).snapshotChanges()
          )
        );
        this.size$.next('manager');
  }
  openDialog(): void {
     this.dialog.open(DialogOverviewExampleDialogComponent);
  }
  signUp(form: NgForm) {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); this is for login with gmail
    const email = form.value.email;
    const password = form.value.password;
    this.authService.logout();
    this.authService.login(email,password).then(res=>{
       console.log(" this is the response "+res);
      this.message="Please check your email and password again!!"
      setTimeout(() => {
        this.message=null;
       }, 2000);
       
     }).catch(error=>{
       console.log(" this is the error  "+error);
  
     })

    this.showSpinner=true;

    // this.authService.login('admin@gmail.com','123123'); //for admin
    //  this.authService.login('chamod999@gmail.com','0714954149'); //for stock manager
    // this.authService.login('ret1@gmail.com','123123'); //for retailer
    this.authService.login('vigith@gmail.com','123123'); //for retailer
    // this.authService.login('vigith@gmail.com','123123'); //for retailer
    // this.authService.login('royalvintage@gmail.com','654321'); //for Manager
   
    // this.authService.login('udulaindunil@gmail.com','#Udula@1997'); //for stock manager Manager email verified
    

    this.showSpinner=false;

    console.log(this.authService.user.uid); 
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



