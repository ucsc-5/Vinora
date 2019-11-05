
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { OrderItem, OrderItemId } from './item.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Order{

    createDate : Date;
    purchesDate : Date;
    acceptedDate : Date;
    deliveredDate : Date;
    
    retailerId: string;
    companyId: string;
    stockmanagerId: string;
    salesRefId: string;
    
    state: string;

   
}



export interface OrderId extends Order{
    id: string;
}



 
@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  private dbPath = '/orders';
  private retailerCollection: AngularFirestoreCollection<OrderItem>;
  
  order: OrderItem;

  orderItems: Observable<OrderItem[]>;
  items: Observable<OrderItemId[]>;
 
  constructor(private afs: AngularFirestore,private db: AngularFireDatabase) {
    this.retailerCollection = this.afs.collection<OrderItem>('orders');
  }

  addItems(OrderItem:OrderItem){
    const id = this.afs.createId();
    this.retailerCollection.doc(id).set(OrderItem).then(
      res=>{
        console.log(" Here is the response "+res);
      }
    ).catch(error=>{
      console.log("Error "+ error);
    });
    
  }

  getItemsFromOrderByCompanyId(companyId:string){
    this.orderItems = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',"active")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as OrderItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.orderItems;
  }

  getItemsFromOrderByRetailerId(retailerId: string){
    this.items = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',"active")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as OrderItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.items;
  }

  
}