
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
    tempTotal: number;
    saleRepId: string;
    stockManagerId: string;
}

export interface orderRet{
  retailerId: string;
  createDate : string; 
  quantity: number;
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
 
  saleRepId
  constructor(private cartService:CartService,private afs: AngularFirestore,private db: AngularFireDatabase) {
    this.orderCollection = this.afs.collection<OrderItem>('orders');
    
  }

  addItems(cartItems:CartItemId[],companyId:string,retailerId:string,id:string){
    let createDate = new Date().toLocaleString();
    const state=-1;
    const tempTotal=0;
    const saleRepId="";
    const stockManagerId= "";
    let total:number=this.total;
    cartItems.forEach(element=>{
      this.orderCollection.doc(id).collection('items').doc(element.id).set(element);
      const tempId=this.afs.createId();
      const quantity=element.quantity
      const orderRet: orderRet={retailerId,createDate,quantity}
      this.afs.collection('items').doc(element.id).collection(`$retailerId`).doc(tempId).set(orderRet);
      total= element.total+total;
      this.cartService.deleteItem(element.id);
    })
    const order: Order ={createDate,retailerId,companyId,total,state,tempTotal,saleRepId,stockManagerId};
    this.orderCollection.doc(id).set(order);
  }


  getCurrentOrdersByRetailerId(retailerId:string){  
   const currnetOrdersByRetailer:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',-1)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return currnetOrdersByRetailer;
  }

  getCurrentOrdersByCompanyId(companyId:string){
    const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',-1).where("saleRepId","==",'').where("stockManagerId",'==','')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return currentOordersByCompany;
  }

  

  getCurrentOrdersByRetailerIdCompanyId(companyId:string,retailerId:string){
    const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',-1).where('retailerId','==',retailerId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return currentOordersByCompany;
  }


  getConfirmedOrdersByRetailerId(retailerId:string){
    const ConfirmedOrdersByRetailerId:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',0).where('saleRepId','==',"")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return ConfirmedOrdersByRetailerId;
  }



      getConfirmedOrdersByRetaiilerIdCompanyId(companyId:string, retailerId:string){
        const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('retailerId','==',retailerId).where('state','==',0).where('saleRepId','==',"")).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Order;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          );
          return orders;
        }
        
        getConfirmedOrdersByCompanyId(companyId:string){
          const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',0).where('saleRepId','==',"")).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Order;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
          return currentOordersByCompany;
        }

        getConfirmedOrdersByCompanyIdStockManagerId(companyId:string,stockManagerId:string){
          const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',0).where('saleRepId','==',"").where('stockManagerId','==',stockManagerId)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Order;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
          return currentOordersByCompany;
        }


  getOrdersByRetailerIdCompanyId(retailerId:string,companyId:string){
    const OrdersByRetailerIdCompanyId:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',0).where('companyId','==',companyId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return OrdersByRetailerIdCompanyId;

  }



  getAssignedOrdersByCompanyIdSaleRepId(companyId:string,saleRepId:string){
    const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('saleRepId','==',saleRepId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return orders;
  }

  getAssignedOrdersByRetailerIdCompanyId(companyId:string,retailerId:string){
    const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',1).where('companyId','==',companyId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return orders;
  }


  getAssignedOrdersByRetailerId(retailerId:string){
    const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return orders;
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

updateState(id:string,stateValue:number,stockManagerId:string){
  this.afs.collection('orders').doc(id).update({state:stateValue});
  this.afs.collection('orders').doc(id).update({tempTotal:0});
  this.afs.collection('orders').doc(id).update({stockManagerId:stockManagerId});
}

stockManagerAddItem(orderKey:string,itemId:string,itemsPrice:number){
    this.afs.collection('orders').doc(orderKey).collection('items').doc(itemId).update({stmadded:true}).then(x=>{
      console.log("Item updatete stmadded");
      this.afs.collection('orders').doc(orderKey).get().subscribe(
        x2=>{
          const newTotal=x2.data().tempTotal+itemsPrice;
          this.afs.collection('orders').doc(orderKey).update({tempTotal:newTotal}).then(()=>{
            console.log("Temp total updated");
            
          }).catch(
            error=>{
              console.log(error+" this is error in update tempTotal");
              return error;
            }
          )
        }
      )
    }).catch(error=>{
      console.log(error+" This is the error of update the stmadded ");
      return error;
    })
 
}

stockManagerDropItem(orderKey:string,itemId:string,itemsPrice:number){
  this.afs.collection('orders').doc(orderKey).collection('items').doc(itemId).update({stmadded:false}).then(x=>{
    this.afs.collection('orders').doc(orderKey).get().subscribe(
      x2=>{
        const newTotal=x2.data().tempTotal-itemsPrice;
        this.afs.collection('orders').doc(orderKey).update({tempTotal:newTotal}).then().catch(
          error=>{
            console.log(error+" this is error in update tempTotal");
            return error;
          }
        )
      }
    )
  }).catch(error=>{
    console.log(error+" this the error of updating in stmadded");
    return error;
  })

}

setStmAddedFeild(orderKey:string,itemId:string){
  this.afs.collection('orders').doc(orderKey).collection('items').doc(itemId).update({stmadded:false});
}

setSaleRep(saleRepId:string,orderKey:string){
  this.afs.collection('orders').doc(orderKey).update({saleRepId:saleRepId,saleRepAccept:0});
}
  
}