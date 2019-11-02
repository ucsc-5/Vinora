
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { OrderItem } from './item.service';

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
  
  order: OrderItem;

  orderItems: OrderItem[]=[];
 
  constructor(private db: AngularFireDatabase) {
    
  }

  addToItemsArray(OrderItem:OrderItem){
    this.orderItems.push(OrderItem);
  }

  
}