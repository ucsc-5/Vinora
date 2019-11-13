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
                            retailerId: string;  
                            coord: firebase.firestore.GeoPoint;
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
 
  retailerByEmail: Observable<RetailerId[]>;
  retailerById: Observable<RetailerId[]>;
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


getRetailerByEmail(email:string){
  
  this.retailerByEmail =this.afs.collection(this.dbPath , ref => ref.where('email', '==',email).where('state', '==', '1').limit(1)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Retailer;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );

  return this.retailerByEmail;
}

getRetailerById(id:string){
  
  this.retailerById =this.afs.collection(this.dbPath , ref => ref.where('retailerId', '==',id).where('state', '==', '1').limit(1)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Retailer;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );

  return this.retailerById;
}


getRegisteredAllCompanies(retailerUid:string){

  this.registerCompanyIds =this.afs.collection(`${this.dbPath}/${retailerUid}/companyRegistrations`, ref => ref.where('registerState', '==',"0")).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as CompanyEmailToken;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return this.registerCompanyIds;
  
}



getRegisteredCompanies(){
  
}
updateProfilePicture(key: string, value: any): Promise<void>{
  return this.afs.collection('retailers').doc(key).update(value);
}
  
}