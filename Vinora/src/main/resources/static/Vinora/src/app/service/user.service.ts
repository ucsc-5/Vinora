import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { LoginUser } from './login-user';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';


 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private dbPath = '/users';

  uid = this.afAuth.authState.pipe(
      map(authState => {
          if(!authState.uid){
            return null;
          }else{
            return authState.uid
          }
        }),
  );

 
  userRef: AngularFireList<any> = null;
 
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.userRef = this.db.list(this.dbPath);
  }
 
  createUser(user:LoginUser): void {
      
      this.userRef.push(user);
  }
 
  updateUser(key: string, value: any): Promise<void> {
    return this.userRef.update(key, value);
  }
 
  deleteUser(key: string): Promise<void> {
    return this.userRef.remove(key);
  }
 
  getUsersList(): AngularFireList<any> {
    return this.userRef;
  }
 
  deleteAll(): Promise<void> {
    return this.userRef.remove();
  }
}