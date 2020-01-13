import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
// import { item } from './items';
 
export interface Item{

  itemName: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  itemImagePath: string;
  description: string;
  category: string;
  state: string;
  companyId: string;
  type:string;
  reOrderingLevel: number;
}

export interface ItemId extends Item{
  id: string;
}

export interface OrderItem extends Item{

  rootId: string;
  retailerId: string;
  stockManagerId: string;
  salesRefId: string;
}

export interface OrderItemId extends OrderItem{
  id: string;
}


@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  private dbPath = 'items';

  items:Observable<ItemId[]>;
  item:Observable<Item>;
  myItem:Item;
  newQuantity;
   private itemDocument : AngularFirestoreDocument<Item>;

  liveQuantity;
 
  constructor(private afs: AngularFirestore) {
    
  }


  getItemsByCompanyId(companyId: string){
    this.items = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',"active")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.items;
  }


  updateItem(key: string, value: any): Promise<void> {
    return this.afs.collection('items').doc(key).update(value);
  }  

  getStockItem(key:string){
    const items = this.afs.collection('items').doc(key);
    return items;
  }



 removeItem(key:string){
  this.afs.collection('items').doc(`${key}`).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
 
}

  

}