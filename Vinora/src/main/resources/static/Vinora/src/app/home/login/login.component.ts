import { Component, OnInit, Injectable } from '@angular/core';

import {FormControl, Validators, NgForm} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;

  //email
  email = new FormControl('', [Validators.required, Validators.email]);


  hide = true;
  constructor(public afAuth: AngularFireAuth, private authService : AuthenticationService,private db: AngularFireDatabase) {

    this.size$ = new BehaviorSubject(null);
        this.items$ = this.size$.pipe(
          switchMap(size => 
            this.db.list('/users', ref =>
              size ? ref.orderByChild('type').equalTo(size) : ref
            ).snapshotChanges()
          )
        );

        this.size$.next('manager');
      
  }




  signUp(form: NgForm) {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); this is for login with gmail
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email,password);
    console.log(this.authService.user.uid) 
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
