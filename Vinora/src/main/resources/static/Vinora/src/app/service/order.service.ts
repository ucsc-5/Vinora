
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { OrderItem, OrderItemId } from './item.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, Timestamp } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartItemId, CartService } from './cart.service';
import { DatePipe } from '@angular/common';

export interface Order{
    createDate : string; 
    retailerId: string;
    companyId: string;
    total: number;
    state: number;
    tempTotal: number;
    saleRepId: string;
    stockManagerId: string;
    date: number;
    month: number;
    year: number;
    encDate: number;
}

export interface orderRet{
  retailerId: string;
  orderDa:Date;
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
  constructor(private datePipe: DatePipe,private cartService:CartService,private afs: AngularFirestore,private db: AngularFireDatabase) {
    this.orderCollection = this.afs.collection<OrderItem>('orders');
    
  }

  addItems(cartItems:CartItemId[],companyId:string,retailerId:string,id:string){
    let theDate= new Date()
    let createDate = theDate.toString();
    let date = theDate.getDate();
    let month = theDate.getMonth()+1;
    let year = theDate.getFullYear();

    let encDate = (year*10000)+(month*100)+(date);
    
    const state=-1;
    const tempTotal=0;
    const saleRepId="";
    const stockManagerId= "";
    let total:number=this.total;
    cartItems.forEach(element=>{
      this.orderCollection.doc(id).collection('items').doc(element.id).set(element);
      const tempId=this.afs.createId();
      const quantity=element.quantity
      const orderDa = new Date();
      const orderRet: orderRet={retailerId,orderDa,quantity}
      this.afs.collection('items').doc(element.itemId).collection(`${retailerId}`).doc(tempId).set(orderRet);
      console.log("Hashiniii"+element.itemId);
      total= element.total+total;
      this.cartService.deleteItem(element.id);
    })
    const order: Order ={createDate,retailerId,companyId,total,state,tempTotal,saleRepId,stockManagerId,date,month,year,encDate};
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
    const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',-1).where("saleRepId","==","").where("stockManagerId",'==',"")).snapshotChanges().pipe(
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


getConformOrderByDateStockManagerId(spDate:Date,stockManagerId:string){
   
  let date = spDate.getDate();
  let month = spDate.getMonth();
  let year = spDate.getFullYear();
  let specificDate = (year*10000)+(month*100)+(date);

  console.log(specificDate+" The date");

  console.log(stockManagerId+" stm id");
  
  const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('encDate','==',specificDate).where('stockManagerId','==',stockManagerId)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return orders;
}
  

getConformOrdersByDateRange(fromDate:Date,toDate:Date,companyId:string,stockManagerId:string){
   
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
  console.log(companyId+" company Id");
  console.log(stockManagerId+ " StockManager Id");
  
  
  // where('encDate','<=',max).where('encDate','>=',min)
  
  const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('stockManagerId','==',stockManagerId).where('sate','==','0')).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return orders;
}



getConformOrderByYearMonthStockManagerId(year:number,month:number,companyId:string,stockManagerId:string){
  const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('year','==',year).where('month','==',month).where('companyId','==',companyId).where('stockManagerId','==',stockManagerId).where('sate','==','0')).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return orders;
  // this.year,this.monthIndex,this.companyId,this.stockManagerId
}

getConfirmedOrdersByRetaiilerIdCompanyIdRetailerId(companyId:string,stockManagerId:string,retailerId:string){

  const orders:Observable<OrderId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('stockManagerId','==',stockManagerId).where('retailerId','==',retailerId).where('sate','==','0')).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );


  orders.subscribe(x=>{
    x.forEach(element=>{
      console.log(element);
    })
  })
  return orders;

  }

}