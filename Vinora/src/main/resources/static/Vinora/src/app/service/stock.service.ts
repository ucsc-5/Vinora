
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Stock } from './stock.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class StockService {
 
  private dbPath = '/stocks';

 
  stockRef: AngularFireList<Stock> = null;
  
 
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,private authService : AuthenticationService ) {

    // this.stockRef = this.db.list(this.dbPath);
    

  }
 
  createStock(stock: Stock): void {
    const uid = this.afAuth.auth.currentUser.uid;
    const newRef = this.db.object(`stocks/${uid}`);
    newRef.set(stock);
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