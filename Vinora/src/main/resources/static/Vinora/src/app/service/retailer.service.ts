import { Injectable, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Retailer } from './retailer.model';
import { map, switchMap,first } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { element } from 'protractor';

 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 
  @Input() companyKeyRef
  private dbPath = '/retailers';
  
  retailerRef: AngularFireList<Retailer> = null;
  
  retailer: Observable<any[]>;
  newCompanies$: Observable<any[]>;
  registeredCompanies$: Observable<any[]>;
  size$: BehaviorSubject<string|null>;

  companyKeys$: Observable<any[]>;
  keyBehavior$: BehaviorSubject<string|null>;
  registerWithCompany;



  
 
 
  constructor(private db: AngularFireDatabase,private fns: AngularFireFunctions) {
    this.retailerRef = this.db.list(this.dbPath);
  }
 
  createRetailer(retailer: Retailer, uid:string): void {
    const newRef = this.db.object(`/retailers/${uid}`);
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
            this.db.list('/retailers', ref =>
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


  async isRegisteredWithCompany(key:string,uid:string){

    this.registeredCompanies$ = await this.size$.pipe(
      switchMap(size => 
        this.db.list(`/delivery_Companies/${key}`, ref =>
          size ? ref.child("registered_Retailers").orderByKey().equalTo(size) : ref
        ).snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        )
      )
    );
    this.size$.next(uid);

    this.registeredCompanies$.subscribe(data=>{
      if(data){
        console.log(data[0].key);
        this.registerWithCompany=data[0].key;
      }
    })
    
    
    setTimeout(function(){console.log(this.registerWithCompany+" From New");}, 5000);
    // this.registerWithCompany
    
    // return this.registeredCompanies$;
    // console.log(this.registerWithCompany+" from th new key");
}


  setNotRegisteredCompanies(uid:string){
    // const newRef=this.db.list('/retailers', ref => ref.orderByKey())

    // newRef.set({company_id: uid});
    

    this.fns.httpsCallable('add2')({ text: 'Some Request Data' })
      .pipe(first())
      .subscribe(resp => {
        console.log({ resp });
      }, err => {
        console.error({ err });
      });

  }


 
}