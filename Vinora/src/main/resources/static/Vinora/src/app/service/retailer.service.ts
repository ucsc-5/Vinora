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

export interface RetailerEmailToken{
                retailerEmail: string;
                registerState: string;              
}

export interface RetailerEmailTokenId extends RetailerEmailToken{
                id: string;
}

export interface CompanyEmailToken{
                companyEmail: string;
                registerState: string
}

export interface CompanyEmailTokenId extends CompanyEmailToken{
                id: string;
}


 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 


  dbPath = 'retailers'
 
  retailer: Observable<RetailerId[]>;
  registerCompanyIds: Observable<CompanyEmailTokenId[]>;

 
  constructor(private storage: AngularFireStorage,private readonly afs: AngularFirestore,private afAuth: AngularFireAuth) {
  }

  
 
getAllCompanies(){

}

registerRetailer(retailerEmail:string,retailerUid:string,companyUid:string,companyEmail:string){

  const registerState= "0"
  console.log(retailerUid+"From the service"+companyUid);
  const companyCollection =  this.afs.collection<RetailerEmailToken>(`companies/${companyUid}/retailerRegistrations`);
  const id1 = this.afs.createId();
  const retailerRegisterOnCompany : RetailerEmailToken={retailerEmail,registerState}
  companyCollection.doc(id1).set(retailerRegisterOnCompany).then(res=>{
    console.log(res);
  }).catch(error=>{
    console.log(error)
  });


  const retailerCollection =  this.afs.collection<CompanyEmailToken>(`retailers/${retailerUid}/companyRegistrations`);
  const id2 = this.afs.createId();
  const companyRegisterOnRetailer : CompanyEmailToken ={companyEmail,registerState}
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


getRegisteredAllCompanies(retailerUid:string){

  this.registerCompanyIds =this.afs.collection(`${this.dbPath}/${retailerUid}/companyRegistrations`, ref => ref.where('registerState', '==',"0")).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as CompanyEmailTokenId;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return this.registerCompanyIds;
  
}
  
}