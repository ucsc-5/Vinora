import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { PendigRetailer } from './pendingRetailer.model';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  constructor(private http: HttpClient) { }
  
  //pending retailers
  storeNewRetailer(retailer:PendigRetailer){
    return this.http.post('https://vinora-dc8a2.firebaseio.com/Retailers.json',retailer);
  }



}
