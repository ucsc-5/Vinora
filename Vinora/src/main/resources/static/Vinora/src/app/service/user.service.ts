import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { LoginUser } from './login-user';
// import { item } from './items';


 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private dbPath = '/users';
 
  userRef: AngularFireList<LoginUser> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.userRef = this.db.list(this.dbPath);
  }
 
  createUser(user: LoginUser): void {
    this.userRef.push(user);
  }
 
  updateUser(key: string, value: any): Promise<void> {
    return this.userRef.update(key, value);
  }
 
  deleteUser(key: string): Promise<void> {
    return this.userRef.remove(key);
  }
 
  getUsersList(): AngularFireList<LoginUser> {
    return this.userRef;
  }
 
  deleteAll(): Promise<void> {
    return this.userRef.remove();
  }
}