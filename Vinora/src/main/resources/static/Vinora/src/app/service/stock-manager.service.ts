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
}

export interface StockManagerId extends StockManager{
  id: string;
}

@Injectable({
  providedIn: 'root'
})




export class StockManagerService {
  stockManger: Observable<StockManagerId[]>;
  dbPath = "stockManagers";

  constructor(private afs: AngularFirestore) { }



  getStockManagerByEmail(email:string){

    this.stockManger = this.afs.collection(this.dbPath , ref => ref.where('email', '==',email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StockManager;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
    return this.stockManger;
  }

}
