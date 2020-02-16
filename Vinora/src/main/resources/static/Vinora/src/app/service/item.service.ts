import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { RetailerId } from './retailer.service';
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
  unitValue: number;
  reOrder:Boolean;
  itemCount:number;
}

export interface orderRet{
  retailerId:string;
  itemQuantity:number;
  orderDate: Date;
}

export interface orderRetId extends orderRet{
  id: string;
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
 
  private orderedRetailerCollection: AngularFirestoreCollection<ItemId>;
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

  

  getReorderItemsByCompanyId(companyId: string){
    this.items = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',"active").where('reOrder','==',true)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.items;
  }


  getRegularItemsByCompnayId(companyId: string){
    this.items = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',"active").where('reOrder','==',false)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.items;
  }

  orderedRetailers(itemId:string,itemQuantity:number,retailerId:string,orderDate:Date){
    const orderRet : orderRet={retailerId,itemQuantity,orderDate};
    const id = this.afs.createId();
    this.afs.collection('items').doc(itemId).collection(`${retailerId}`).doc(id).set(orderRet);
  }

  oderedRetailerDelete(itemId:string,retailerId:string){

  }

  updateItem(key: string, value: any): Promise<void> {
    return this.afs.collection('items').doc(key).update(value);
  }  

  updateQuantityItem(key: string, value: any,retailerId:string,companyId:string){
    this.afs.collection('retailers').doc(`${retailerId}`).collection('items').doc(key).update(value);
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

getItemReportsByDateRange(fromDate:Date,toDate:Date,itemId:String,retailerId:string){
     
  let date1 = fromDate.getDate();
  let month1 = fromDate.getMonth();
  let year1 = fromDate.getFullYear();

  let date2 = toDate.getDate();
  let month2 = toDate.getMonth();
  let year2 = toDate.getFullYear();

  let min = (year1*10000)+(month1*100)+(date1);
  let max = (year2*10000)+(month2*100)+(date2);

  console.log(min+ "min value");
  console.log(max+ "max Value");
  
  
  // this.afs.collection('retailers').doc(`${retailerId}`).collection('items').doc(`${itemId}`).get().subscribe(x=>{
  //  x.array.forEach(element => {
     
  //  });
  
  // })
  
  
}



  

}