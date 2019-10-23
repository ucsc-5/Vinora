import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
// import { item } from './items';
 
@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  private dbPath = '/items';
 
 
  constructor(private db: AngularFireDatabase) {
  }
 
 
 
  
}