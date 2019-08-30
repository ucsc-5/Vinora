import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/app/item/item.model';
// import { Item } from './item';

// import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  private items: Item[] = [
    // new Item(), new Item()
  ]

  storeNewItem(item:Item){
    return this.http.post('https://vinora-dc8a2.firebaseio.com/items.json',item);
  }

  getItem(){
    return this.http.get<Item[]>('https://vinora-dc8a2.firebaseio.com/items.json');
  
  }

}
