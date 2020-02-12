import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, finalize } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { getMatFormFieldMissingControlError } from '@angular/material';
import { RetailerEmailTokenId, RetailerEmailToken,Retailer,RetailerId } from './retailer.service';
import { Item, ItemId } from './item.service';

export interface Company{

  address: string;
  companyName:string,
  contactNumber: string,
  managerNic:string,
  imagePath:string,
  companyId:string,
  managerName:string,
  email: string;
  state: string;
  coord: firebase.firestore.GeoPoint; 
}



export interface CompanyId extends Company{ id: string}

export interface Vehicle{
  number:string;
  model:string;
  ownerName:string;
  ownerAddress:string;
  ownerMobile:string;
  photo_url:string;
}

export interface VehicleId extends Vehicle { id: string; }



@Injectable({
  providedIn: 'root'
})
export class CompanyService {
 
  private dbPath = 'companies';

 
  private companyCollection: AngularFirestoreDocument<Company> = null;
  company: Observable<CompanyId[]>;

  private retailerCollection: AngularFirestoreDocument<Retailer> = null;
  retailer: Observable<RetailerId[]>;

  private itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<ItemId[]>;


  private vehicleCollection: AngularFirestoreCollection<Vehicle>;
  vehicles: Observable<VehicleId[]>;

  private allCompanyCollection: AngularFirestoreDocument<Company> = null
  
  
  private registeredRetailersCollection: AngularFirestoreCollection<RetailerEmailTokenId>;
  private notRegRetailersCollection: AngularFirestoreCollection<RetailerId>;

  
  constructor(private readonly afs: AngularFirestore,private db: AngularFireDatabase, private afAuth: AngularFireAuth,private authService : AuthenticationService,private storage: AngularFireStorage) {
    
  }   

  getAllCompanies(){
    const companies: Observable<CompanyId[]> = this.afs.collection(this.dbPath).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    return companies;
  }

  // for use of admin  retailer
  getRegisteredCompanies(){
    const registeredCompanies: Observable<CompanyId[]> = this.afs.collection(this.dbPath , ref => ref.where('state', '==',"1")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    return registeredCompanies;
  }

  //for use of admin
  getRequestedCompanies(){
    const requestededCompanies: Observable<CompanyId[]> =this.afs.collection(this.dbPath , ref => ref.where('state', '==',"0")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
    return requestededCompanies;
  }



  // for the comapany dashboard and retailer 
  getCompanyByEmail(email:string){
    this.company =this.afs.collection(this.dbPath , ref => ref.where('email', '==',email).where('state', '==',"1").limit(1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
    return this.company;
  }

  getCompanyById(uid:string){
    this.company =this.afs.collection(this.dbPath , ref => ref.where('companyId', '==',uid).limit(1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
    return this.company;
  }

  getRegisteredRetailerById(uid:string){
    this.retailer =this.afs.collection(this.dbPath , ref => ref.where('retailerId', '==',uid).limit(1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Retailer;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
    return this.company;
  }


  getVehicle(uid:string){

    this.vehicleCollection = this.afs.collection<Vehicle>(`companies/${uid}/vehicles`);
    
    this.vehicles = this.vehicleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.vehicles;
  }


  getItems(uid:string){

    this.itemCollection = this.afs.collection<Item>(`companies/${uid}/items`);
    
    this.items = this.itemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.items;
  }




// for find retailers of an each company
  getRegisteredRetailers(uid:string){

    this.registeredRetailersCollection = this.afs.collection<RetailerEmailTokenId>(`companies/${uid}/retailerRegistrations`);
    
    const RetailerEmailTokens: Observable<RetailerEmailTokenId[]> = this.registeredRetailersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RetailerEmailToken;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return RetailerEmailTokens;
  }

  getNotRegRetailers(uid:string){

    this.notRegRetailersCollection = this.afs.collection<RetailerId>(`companies/${uid}/notRegRetailers`);  
    const notRegRetailers: Observable<RetailerId[]> = this.notRegRetailersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Retailer;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return notRegRetailers;
  }


  deleteItem(companyKey:string,itemId: string){
    const message = this.afs.doc(`${this.dbPath}/${companyKey}/items/${itemId}`).delete().then(response=>{
      return response;
    }).catch(error=>{
      return error
    });

    return message;
  }

  confirmRegistration(key:string){
    return this.afs.collection('companies').doc(key).update({state:"1"});
  }

  updateProfilePicture(key: string, value: any): Promise<void> {

    console.log(" updateProfilePicture");
    return this.afs.collection('companies').doc(key).update(value);
  }  
  updatePhoneNumber(key:string,value:any):Promise<void>
{
  console.log(" updatePhoneNumber");
  return this.afs.collection('companies').doc(key).update(value);
}
}

