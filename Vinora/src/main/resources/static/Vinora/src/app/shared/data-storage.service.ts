import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../service/item.model';





@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  items: Item[]; 

  constructor(private http: HttpClient) {

   }

}
