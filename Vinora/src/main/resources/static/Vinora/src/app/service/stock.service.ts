
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Stock } from './stock.model';
 
@Injectable({
  providedIn: 'root'
})
export class StockService {
 
  private dbPath = '/stocks';
 
  stockRef: AngularFireList<Stock> = null;
 
  constructor(private db: AngularFireDatabase) {

    this.stockRef = this.db.list(this.dbPath);
  }
 
  createStock(stock: Stock): void {
    this.stockRef.push(stock);
  }
 
  updateStock(key: string, value: any): Promise<void> {
    return this.stockRef.update(key, value);
  }
 
  deleteStock(key: string): Promise<void> {
    return this.stockRef.remove(key);
  }
 
  getStocksList(): AngularFireList<Stock> {
    return this.stockRef;
  }
 
  deleteAll(): Promise<void> {
    return this.stockRef.remove();
  }
}