import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { OrderItem, OrderItemId } from './item.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, Timestamp } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartItemId, CartService } from './cart.service';


 
@Injectable({
  providedIn: 'root'
})
export class StmConfirmOrderTempService {
 
  private dbPath = '/tempCurrentOrders';
  private orderCollection: AngularFirestoreCollection<OrderItem>;
  
   
  items: Observable<CartItemId[]>;
  total: number=0;
 
  constructor(private cartService:CartService,private afs: AngularFirestore,private db: AngularFireDatabase) {
    this.orderCollection = this.afs.collection<OrderItem>('tempCurrentOrders');
    
  }

  addItems(item:CartItemId,orderId:string,orderTotal:number){
      // this.orderCollection.doc(orderId).set({total:orderTotal});
      this.orderCollection.doc(orderId).collection('items').doc(item.id).set(item);
      console.log("This function is running");
      
  }

  dropItems(itemId:string,orderId:string){
    console.log("Order Key: "+orderId+"Item id: "+itemId+"This is the keys");
    console.log("This function is running Deleting");
    return this.orderCollection.doc(orderId).collection('items').doc(itemId).delete();
  }

  getItemsByOrderId(orderKey:string){
    this.items = this.orderCollection.doc(orderKey).collection('items').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CartItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.items;
  }


  // getCurrentOrdersByRetailerId(retailerId:string){  
  //  const currnetOrdersByRetailer:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',0)).snapshotChanges().pipe(
  //   map(actions => actions.map(a => {
  //     const data = a.payload.doc.data() as Order;
  //     const id = a.payload.doc.id;
  //     return { id, ...data };
  //   }))
  // );
  // return currnetOrdersByRetailer;
  // }

  // getCurrentOrdersByCompanyId(companyId:string){
  //   const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',0)).snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Order;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  //   return currentOordersByCompany;
  // }


  // getConfirmedOrdersByRetailerId(retailerId:string){
  //   const ConfirmedOrdersByRetailerId:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',1)).snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Order;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  //   return ConfirmedOrdersByRetailerId;
  // }


  // getConfirmedOrdersByCompanyId(companyId:string){
  //   const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',1)).snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Order;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  //   return currentOordersByCompany;
  // }


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



// getItemsByOrderId(orderKey:string){
//   this.items = this.afs.collection('orders').doc(orderKey).collection('items').snapshotChanges().pipe(
//     map(actions => actions.map(a => {
//       const data = a.payload.doc.data() as CartItem;
//       const id = a.payload.doc.id;
//       return { id, ...data };
//     }))
//   );
//   return this.items;
// }

// updateState(id:string,stateValue:number){
//   return this.afs.collection('orders').doc(id).update({state:stateValue});
// }

// setItemForOrder(){
  
// }

  

  
}