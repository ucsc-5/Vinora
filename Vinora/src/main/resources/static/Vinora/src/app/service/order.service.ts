
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { OrderItem, OrderItemId } from './item.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartItemId, CartService } from './cart.service';

export interface Order{

    createDate : Date; 
    retailerId: string;
    companyId: string;
    total: number;
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
  private orderCollection: AngularFirestoreCollection<OrderItem>;
  
 

  orders: Observable<OrderId[]>;
  items: Observable<CartItemId[]>;
  total: number=0;
 
  constructor(private cartService:CartService,private afs: AngularFirestore,private db: AngularFireDatabase) {
    this.orderCollection = this.afs.collection<OrderItem>('orders');
    
  }

  addItems(cartItems:CartItemId[],companyId:string,retailerId:string,id:string){
    let createDate = new Date();
    const state="current"
    let total:number=this.total;
    cartItems.forEach(element=>{
      this.orderCollection.doc(id).collection('items').doc(element.id).set(element);
      total= element.total+total;
      this.cartService.deleteItem(element.id);
    })
    const order: Order ={createDate,retailerId,companyId,total,state};
    this.orderCollection.doc(id).set(order);
  }


  getOrderByRetailerId(retailerId:string){  
    this.orders = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',"current")).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return this.orders;
}


getItemsByOrderId(orderKey:string){
  this.items = this.afs.collection('orders').doc(orderKey).collection('items').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as CartItem;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return this.items;
}

  

  
}