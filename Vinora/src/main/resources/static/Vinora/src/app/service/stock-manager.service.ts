import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface StockManager{
  fullName:string;
  address:string;
  nic:string;
  email:string;
  contactNumber:string;
  state:string;
  companyId:string;
  imagePath: string;
  uid: string
}

export interface StockManagerId extends StockManager{
  id: string;
}

export interface RemovedStockManager extends StockManager{
  reason:string
}

@Injectable({
  providedIn: 'root'
})




export class StockManagerService {
  stockManager: Observable<StockManagerId[]>;
  dbPath = "stockManagers";

  constructor(private afs: AngularFirestore) { }



  getStockManagerByEmail(email:string){
    this.stockManager = this.afs.collection(this.dbPath , ref => ref.where('email','==',email).limit(1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StockManager;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.stockManager;
  }

  getActiveStockManagerByCompanyId(companyId:string){
    const  stockManager  = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==','active') ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StockManager;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return stockManager;
  }


  getDeleteStockManagerByCompanyId(companyId:string){
    const  stockManager  = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==','deleted') ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RemovedStockManager;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return stockManager;
  }

  
  updateProfilePicture(key: string, value: any): Promise<void> {
    return this.afs.collection('stockManagers').doc(key).update(value);
  }  
  updatePhoneNumber(key:string,value:any):Promise<void>
{
  return this.afs.collection('stockManagers').doc(key).update(value);
}


  removeStockManger(key:string, value: any):Promise<void>{

    return this.afs.collection('stockManagers').doc(key).update(value);
  // this.afs.collection('stockManagers').doc(`${key}`).delete().then(function() {
  //     console.log("Document successfully deleted!");
  // }).catch(function(error) {
  //     console.error("Error removing document: ", error);
  // });
  }
}
