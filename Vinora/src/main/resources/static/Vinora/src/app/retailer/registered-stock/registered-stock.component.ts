import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';
import { Manager } from 'src/app/manager/manager.model';

@Component({
  selector: 'app-registered-stock',
  templateUrl: './registered-stock.component.html',
  styleUrls: ['./registered-stock.component.css']
})
export class RegisteredStockComponent implements OnInit {

  stocks: Stock[]=[ new Stock(1,'royal vintage','id','rangala' ,'royalvintage@gmail.com','colombo 05','0119876567','http://www.krakowpost.com/wp-content/uploads/2018/03/closed-shop.jpg'),
                    new Stock(2,'royal vintage2','id2','rangala2' ,'royalvintage@gmail.com2','colombo 052','0119876567','http://www.krakowpost.com/wp-content/uploads/2018/03/closed-shop.jpg')]
  constructor() { 
   console.log(this.stocks[0])
  }
  ngOnInit() {
  }
}
