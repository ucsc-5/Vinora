import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, finalize } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { getMatFormFieldMissingControlError } from '@angular/material';

export interface Company{
 key: string;
 managerName: string;
 managerNic: string;
 companyId: number;
 companyName: string;
 email: string;
 address: string;
 contactNumber: string;
 imagePath: string;
 state: string;
}





export interface Item{

  itemName: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  itemImagePath: string;
  description: string;
  category: string;
  state: string;
}
export interface ItemsId extends Item { id: string; }

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

 
  companyCollection: AngularFirestoreDocument<Company> = null;
  company: Observable<Company[]>;

  private itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<ItemsId[]>;

  private vehicleCollection: AngularFirestoreCollection<Vehicle>;
  vehicles: Observable<VehicleId[]>;
 
  constructor(private readonly afs: AngularFirestore,private db: AngularFireDatabase, private afAuth: AngularFireAuth,private authService : AuthenticationService,private storage: AngularFireStorage) {
    
  }

  getCompany(uid:string){
    // this.companyCollection = this.afs.doc<Company>('companies/'+uid);
    // this.company= this.companyCollection.valueChanges();
    // return this.company;
  }

  getCompanyByEmail(email:string){
    this.company =this.afs.collection(this.dbPath , ref => ref.where('email', '==',email)).snapshotChanges().pipe(
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

  deleteItem(companyKey:string,itemId: string){
    const message = this.afs.doc(`${this.dbPath}/${companyKey}/items/${itemId}`).delete().then(response=>{
      return response;
    }).catch(error=>{
      return error
    });

    return message;
  }
}
