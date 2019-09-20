import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Retailer } from './retailer.model';
 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 
  private dbPath = '/retailers';
 
  retailerRef: AngularFireList<Retailer> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.retailerRef = this.db.list(this.dbPath);
  }
 
  createRetailer(item: Retailer): void {
    this.retailerRef.push(item);
  }
 
  updateRetailer(key: string, value: any): Promise<void> {
    return this.retailerRef.update(key, value);
  }
 
  deleteRetailer(key: string): Promise<void> {
    return this.retailerRef.remove(key);
  }
 
  getRetailersList(): AngularFireList<Retailer> {
    return this.retailerRef;
  }
 
  deleteAll(): Promise<void> {
    return this.retailerRef.remove();
  }
}