import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Retailer } from './retailer.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Company } from './company.model';
import { Observable, BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 
  private dbPath = '/retaiers';
  
  retailerRef: AngularFireList<Retailer> = null;
  
  retailer: Observable<any[]>;
  newCompanies$: Observable<any[]>;
  registeredCompanies$: Observable<any[]>;
  size$: BehaviorSubject<string|null>;
 
 
  constructor(private db: AngularFireDatabase) {
    this.retailerRef = this.db.list(this.dbPath);
  }
 
  createRetailer(retailer: Retailer, uid:string): void {
    const newRef = this.db.object(`/retaiers/${uid}`);
    newRef.set(retailer);
  }
 
  updateRetailer(key: string, value: any): Promise<void> {
    return this.retailerRef.update(key, value);
  }
 
  deleteRetailer(key: string): Promise<void> {
    return this.retailerRef.remove(key);
  }


  getRetailer(uid:string){
    this.size$ = new BehaviorSubject(null);
        this.retailer = this.size$.pipe(
          switchMap(size => 
            this.db.list('/retaiers', ref =>
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
 
  getRetailersList(): AngularFireList<Retailer> {
    return this.retailerRef;
  }
 
  deleteAll(): Promise<void> {
    return this.retailerRef.remove();
  }
}