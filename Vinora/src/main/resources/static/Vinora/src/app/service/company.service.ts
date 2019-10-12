import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Company } from './company.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item } from './item.model';



@Injectable({
  providedIn: 'root'
})
export class CompanyService {
 
  private dbPath = '/delivery_Companies';

 
  companykRef: AngularFireList<Company> = null;

  company: Observable<any[]>;
  requestCompanies$: Observable<any[]>;
  registeredCompanies$: Observable<any[]>;
  size$: BehaviorSubject<string|null>;

  itemsRef: AngularFireList<any>;   // for getting items
  items: Observable<any[]>;     // for getting items

  
 
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,private authService : AuthenticationService ) {
    this.companykRef = this.db.list(this.dbPath);
    this.getRequestCompanies();
    this.getRegisteredCompanies();
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

  getCompany(uid:string){
    this.size$ = new BehaviorSubject(null);
        this.company = this.size$.pipe(
          switchMap(size => 
            this.db.list('/delivery_Companies', ref =>
              size ? ref.orderByKey().equalTo(size) : ref
            ).snapshotChanges().pipe(
              map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
          )
        );

        this.size$.next(uid);
  }
 
  
  getRequestCompanies(){
    this.size$ = new BehaviorSubject(null);
    this.requestCompanies$ = this.size$.pipe(
          switchMap(size => 
            this.db.list('/delivery_Companies', ref =>
              size ? ref.orderByChild('state').equalTo(size) : ref
            ).snapshotChanges().pipe(
              map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                )
            )
          )
          );

          this.size$.next("0");
    }

    getRegisteredCompanies(){
      this.size$ = new BehaviorSubject(null);
      this.registeredCompanies$ = this.size$.pipe(
            switchMap(size => 
              this.db.list('/delivery_Companies', ref =>
                size ? ref.orderByChild('state').equalTo(size) : ref
              ).snapshotChanges().pipe(
                map(changes => 
                  changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                  )
              )
            )
            );
            this.size$.next("1");
      }

        
  deleteAll(): Promise<void> {
    return this.companykRef.remove();
  }


  createItem(item: Item,managerId: string): void {
    // const newRef = this.db.object(`/delivery_Companies/${managerId}/items`);
    // newRef.push(item);
    this.db.list(`/delivery_Companies/${managerId}/items`).push(item);
    // this.itemRef.push(item);
  }

  getCompanyItems(managerId: string){
    this.itemsRef = this.db.list(`/delivery_Companies/${managerId}/items`);
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return this.items;
  }


}