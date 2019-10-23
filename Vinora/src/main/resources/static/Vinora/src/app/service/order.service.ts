
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Order } from './order.model';
// import { item } from './items';

 
@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  private dbPath = '/orders';
 

 
  constructor(private db: AngularFireDatabase) {
 
  }
 
  
}