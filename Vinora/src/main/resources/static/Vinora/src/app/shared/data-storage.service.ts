import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemServiceService } from '../item/item-service.service';
import { Item } from '../item/item.model';

import { Response } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';
import { RetailerItemService } from '../retailer/retailer-items/retailer-item.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,private itemService: ItemServiceService,private retailerItemService: RetailerItemService) { }

  
  retailerAddNewItem(item:Item){
    return this.http.post('https://vinora-dc8a2.firebaseio.com/Retailer/Selected-Items.json',item);
  }
  
  getItems():Observable<Item[]>{
    return this.http.get<Item[]>('https://vinora-dc8a2.firebaseio.com/items.json')
  }


}
