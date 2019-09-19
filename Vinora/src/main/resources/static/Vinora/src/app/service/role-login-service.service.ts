// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import { Router } from '@angular/router';


// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';
// import { LoginUser } from '../login-user';



// @Injectable({
//   providedIn: 'root'
// })
// export class RoleLoginServiceService {


//   user: BehaviorSubject<LoginUser> = new BehaviorSubject(null)

//   constructor(private afAuth: AngularFireAuth,
//               private db: AngularFireDatabase,
//               private router: Router) {


//       this.afAuth.authState
//         .switchMap(auth => {
//           if (auth) {
//             /// signed in
//             return this.db.object('users/' + auth.uid)
//           } else {
//             /// not signed in
//             return Observable.of(null)
//           }
//         })
//         .subscribe(user => {
//           this.user.next(user)
//         })
//     }


//     ///// SignIn - SignOut Process /////

//     googleLogin() {
//       const provider = new firebase.auth.GoogleAuthProvider()
//       return this.afAuth.auth.signInWithPopup(provider)
//         .then(credential =>  {
//             this.updateUser(credential.user)
//         })
//     }

//     signOut() {
//       this.afAuth.auth.signOut()
//     }

//     //// Update user data ////

//     /// updates database with user info after login
//     /// only runs if user role is not already defined in database
//     private updateUser(authData) {
//       const userData = new LoginUser(authData)
//       const ref = this.db.object('users/' + authData.uid)
//       ref.take(1)
//          .subscribe(user => {
//           if (!user.role) {
//             ref.update(userData)
//           }
//       })

//     }
// }
