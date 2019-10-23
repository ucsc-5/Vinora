import { Injectable, Input } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { finalize, switchMap, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Company, CompanyId } from './company.service';


export interface Retailer { shopName: string;
                            email: string;
                            address: string;
                            contactNumber: string;
                            state: string;
                            url: string;                         
}

export interface RetailerId extends Retailer{id: string}

export interface RetailerRegisterToken{
                          companyId: string;
                          retailerId: string;              
}

export interface RetailerRegisterTokenId extends RetailerRegisterToken{
                          id: string;
}


 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 


  dbPath = 'retailers'
 
  retailer: Observable<RetailerId[]>;

 
  constructor(private storage: AngularFireStorage,private readonly afs: AngularFirestore,private afAuth: AngularFireAuth) {
  }

 
getAllCompanies(){

}



registerRetailer(retailerUid:string,companyUid:string ){
  const retailerId = retailerUid;
  const companyId = companyUid;
  console.log(retailerUid+"From the service"+companyUid);
  const companyCollection =  this.afs.collection<RetailerRegisterToken>(`companies/${companyUid}/retailerRegistrations`);
  const id = this.afs.createId();
            //  const item:Item = {itemName,brand,quantity,unitPrice,itemImagePath,description,category,state};
            //  console.log(item);
            //  this.itemsCollection.doc(id).set(item);
  const retailerRegisterToken : RetailerRegisterToken={companyId,retailerId}
  companyCollection.doc(id).set(retailerRegisterToken);
}


getRetailer(email:string){
  
  this.retailer =this.afs.collection(this.dbPath , ref => ref.where('email', '==',email)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Retailer;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );

  return this.retailer;
}
  
}