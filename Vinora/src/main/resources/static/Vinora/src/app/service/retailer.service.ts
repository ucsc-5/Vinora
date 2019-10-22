import { Injectable, Input } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Retailer } from './retailer.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { finalize, switchMap, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Company, CompanyId } from './company.service';


export interface Reatiler { shopName: string;
                            email: string;
                            address: string;
                            contactNumber: string;
                            state: string;
                            userId: string;
                            key: string;
                            url: string;                         
}

 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 


  dbPath = 'retailers'
  // currentRetailerId;
  
  private retailerCollection: AngularFirestoreCollection<Reatiler>;
  retailer: Observable<Reatiler[]>;

 
  constructor(private storage: AngularFireStorage,private readonly afs: AngularFirestore,private afAuth: AngularFireAuth) {
    this.retailerCollection = afs.collection<Reatiler>('retailers');
  }

 
getAllCompanies(){

}0

registerRetailer(company: CompanyId){
  console.log(company.id);
}


getRetailer(uid:string){
  
  this.retailer =this.afs.collection(this.dbPath , ref => ref.where('id', '==',uid)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Reatiler;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );

  return this.retailer;
}
  
}