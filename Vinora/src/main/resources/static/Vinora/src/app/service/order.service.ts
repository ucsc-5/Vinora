
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Order } from './order.model';
import { Item } from './item.model';
// import { item } from './items';

 
@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  private dbPath = '/orders';
 
  orderRef: AngularFireList<Item> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.orderRef = this.db.list(this.dbPath);
  }
 
  createOrder(item: Item): void {
    this.orderRef.push(item);
  }
 
  updateOrder(key: string, value: any): Promise<void> {
    return this.orderRef.update(key, value);
  }
 
  deleteOrder(key: string): Promise<void> {
    return this.orderRef.remove(key);
  }
 
  getOrdersList(): AngularFireList<Item> {
    return this.orderRef;
  }
 
  deleteAll(): Promise<void> {
    return this.orderRef.remove();
  }
}