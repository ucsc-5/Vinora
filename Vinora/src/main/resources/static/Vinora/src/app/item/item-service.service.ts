import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  storeNewItem(item:Item){
    return this.http.post('https://vinora-dc8a2.firebaseio.com/items.json',item);
  }

  getItem(){
    return this.http.get('https://vinora-dc8a2.firebaseio.com/items.json');
  }
}
