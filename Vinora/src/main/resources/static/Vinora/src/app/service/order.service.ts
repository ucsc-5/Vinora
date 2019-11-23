
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { OrderItem, OrderItemId } from './item.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, Timestamp } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartItemId, CartService } from './cart.service';

export interface Order{

    createDate : string; 
    retailerId: string;
    companyId: string;
    total: number;
    state: number;
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
  

  currentStaticOordersByCompany: OrderId
   
  items: Observable<CartItemId[]>;
  total: number=0;
 
  constructor(private cartService:CartService,private afs: AngularFirestore,private db: AngularFireDatabase) {
    this.orderCollection = this.afs.collection<OrderItem>('orders');
    
  }

  addItems(cartItems:CartItemId[],companyId:string,retailerId:string,id:string){
    let createDate = new Date().toLocaleString();
    const state=0;
    let total:number=this.total;
    cartItems.forEach(element=>{
      this.orderCollection.doc(id).collection('items').doc(element.id).set(element);
      total= element.total+total;
      this.cartService.deleteItem(element.id);
    })
    const order: Order ={createDate,retailerId,companyId,total,state};
    this.orderCollection.doc(id).set(order);
  }


  getCurrentOrdersByRetailerId(retailerId:string){  
   const currnetOrdersByRetailer:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',0)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return currnetOrdersByRetailer;
  }

  getCurrentOrdersByCompanyId(companyId:string){
    const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',0)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return currentOordersByCompany;
  }


  getConfirmedOrdersByRetailerId(retailerId:string){
    const ConfirmedOrdersByRetailerId:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return ConfirmedOrdersByRetailerId;
  }


  getConfirmedOrdersByCompanyId(companyId:string){
    const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return currentOordersByCompany;
  }


  // getCurrentOrdersByCompanyId(companyId:string){
  //   const collection = this.afs.collection<Order>(this.dbPath, ref => ref.where('companyId', '==', companyId))
  //   const user$ = collection
  //     .valueChanges()
  //     .pipe(
  //       map(users => {
  //         const user = users[0];
  //         console.log(user);
  //         return user;
  //       })
  //     );
    
  //   return user$;
  // }



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

updateState(id:string,stateValue:number){
  return this.afs.collection('orders').doc(id).update({state:stateValue});
}

setItemForOrder(){
  
}

  

  
}