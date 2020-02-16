import { Injectable } from '@angular/core';
import { Item } from './item.service';

export interface ReturnGoods{

  comment: string;
  companyId: string;
  companyName: string;
  items: Item;
  orderId: string;
  retailerId : string;
  returnGoodsQuantity: number;
  time: Date;

}

export interface ReturnGoodsId extends ReturnGoods{
  id:string;
}


@Injectable({
  providedIn: 'root'
})
export class ReturnGoodsService {

  constructor() { }
}
