import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemServiceService } from '../item/item-service.service';
import { Item } from '../item/item.model';
import { Response } from 'selenium-webdriver/http';
import { RetailerItemService } from '../retailer/retailer-items/retailer-item.service';




@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  items: Item[]; 

  constructor(private http: HttpClient ,private itemService: ItemServiceService,private retailerItemService: RetailerItemService) {

   }

  
  retailerAddNewItem(item:Item){
    return this.http.post('https://vinora-dc8a2.firebaseio.com/Retailer/Selected-Items.json',item);
  }
  
  // getItems(){
  //   this.http.get('https://vinora-dc8a2.firebaseio.com/Retailer/Selected-Items.json').subscribe(
  //     (response: Response)=>{
  //       const items: Item[] = response.json();
  //       console.log(items);   
  //     }
  //   )
  // }



}
