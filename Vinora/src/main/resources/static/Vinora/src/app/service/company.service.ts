import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Company } from './company.model';
 
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
 
  private dbPath = '/delivery_Companies';

 
  companykRef: AngularFireList<Company> = null;
  
 
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,private authService : AuthenticationService ) {
    this.companykRef = this.db.list(this.dbPath);
  }
 
  createCompany(company: Company,uid:string): void {
    const newRef = this.db.object(`delivery_Companies/${uid}`);
    newRef.set(company);
  }
 
  updateCompany(key: string, value: any): Promise<void> {
    return this.companykRef.update(key, value);
  }
 
  deleteCompany(key: string): Promise<void> {
    return this.companykRef.remove(key);
  }
 
  getCompanysList(): AngularFireList<Company> {
    return this.companykRef;
  }
 
  deleteAll(): Promise<void> {
    return this.companykRef.remove();
  }
}