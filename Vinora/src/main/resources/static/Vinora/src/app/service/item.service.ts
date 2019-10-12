import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
// import { item } from './items';
import { Item } from './item.model';
 
@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  private dbPath = '/items';
 
  itemRef: AngularFireList<Item> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.itemRef = this.db.list(this.dbPath);
  }
 
 
 
  updateItem(key: string, value: any): Promise<void> {
    return this.itemRef.update(key, value);
  }
 
  deleteItem(key: string): Promise<void> {
    return this.itemRef.remove(key);
  }
 
  getItemsList(): AngularFireList<Item> {
    return this.itemRef;
  }
 
  deleteAll(): Promise<void> {
    return this.itemRef.remove();
  }
}