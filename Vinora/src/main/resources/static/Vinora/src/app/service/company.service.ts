import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, finalize } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { getMatFormFieldMissingControlError } from '@angular/material';
import { RetailerEmailTokenId, RetailerEmailToken } from './retailer.service';
import { Item, ItemId } from './item.service';


export interface Company{
  managerName: string;
  managerNic: number;
  companyName: string;
  email: string;
  address: string;
  contactNumber: string;
  imagePath: string;
  state: string;
  companyId: string;
  coord: firebase.firestore.GeoPoint;
}

export interface CompanyId extends Company{ id: string}

// export interface Item{

//   itemName: string;
//   brand: string;
//   quantity: number;
//   unitPrice: number;
//   itemImagePath: string;
//   description: string;
//   category: string;
//   state: string;
// }
// export interface ItemsId extends Item { id: string; }


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

  private itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<ItemId[]>;


  private vehicleCollection: AngularFirestoreCollection<Vehicle>;
  vehicles: Observable<VehicleId[]>;

  private allCompanyCollection: AngularFirestoreDocument<Company> = null
  
  
  private registeredRetailersCollection: AngularFirestoreCollection<RetailerEmailTokenId>;
  registeredRetailersKey: Observable<RetailerEmailTokenId[]>

  
  constructor(private readonly afs: AngularFirestore,private db: AngularFireDatabase, private afAuth: AngularFireAuth,private authService : AuthenticationService,private storage: AngularFireStorage) {
    
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
    
    this.registeredRetailersKey = this.registeredRetailersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RetailerEmailToken;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.registeredRetailersKey;
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

