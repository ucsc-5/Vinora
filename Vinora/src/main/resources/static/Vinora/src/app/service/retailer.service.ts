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

export interface RetailerIdToken{
                retailerId: string;
                registerState: string;              
}

export interface RetailerIdTokenId extends RetailerIdToken{
                id: string;
}

export interface CompanyIdToken{
                companyId: string;
                registerState: string
}

export interface CompanyIdTokenId extends CompanyIdToken{
                id: string;
}


 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 


  dbPath = 'retailers'
 
  retailer: Observable<RetailerId[]>;
  registerCompanyIds: Observable<CompanyIdTokenId[]>;

 
  constructor(private storage: AngularFireStorage,private readonly afs: AngularFirestore,private afAuth: AngularFireAuth) {
  }

  
 
getAllCompanies(){

}

registerRetailer(retailerUid:string,companyUid:string ){
  const retailerId = retailerUid;
  const companyId = companyUid;
  const registerState= "0"
  console.log(retailerUid+"From the service"+companyUid);
  const companyCollection =  this.afs.collection<RetailerIdToken>(`companies/${companyUid}/retailerRegistrations`);
  const id1 = this.afs.createId();
            //  const item:Item = {itemName,brand,quantity,unitPrice,itemImagePath,description,category,state};
            //  console.log(item);
            //  this.itemsCollection.doc(id).set(item);
  const retailerRegisterOnCompany : RetailerIdToken={retailerId,registerState}
  companyCollection.doc(id1).set(retailerRegisterOnCompany).then(res=>{
    console.log(res);
  }).catch(error=>{
    console.log(error)
  });


  const retailerCollection =  this.afs.collection<RetailerIdToken>(`retailers/${retailerUid}/companyRegistrations`);
  const id2 = this.afs.createId();
            //  const item:Item = {itemName,brand,quantity,unitPrice,itemImagePath,description,category,state};
            //  console.log(item);
            //  this.itemsCollection.doc(id).set(item);
  const companyRegisterOnRetailer : CompanyIdToken ={companyId,registerState}
  retailerCollection.doc(id2).set(companyRegisterOnRetailer).then(
    x=>{console.log(x)}
  ).catch(error=>{
    console.log(error)
  });

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


getRegisteredCompanies(retailerUid:string){

  this.registerCompanyIds =this.afs.collection(`${this.dbPath}/${retailerUid}/companyRegistrations`, ref => ref.where('registerState', '==',"0")).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as CompanyIdTokenId;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );

  return this.registerCompanyIds;
  
}
  
}