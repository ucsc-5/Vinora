import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/service/stock.model';

@Component({
  selector: 'app-registered-stock',
  templateUrl: './registered-stock.component.html',
  styleUrls: ['./registered-stock.component.css']
})
export class RegisteredStockComponent implements OnInit {

  // stocks: Stock[]=[ new Stock(1,'royal vintage','id','rangala' ,'royalvintage@gmail.com','colombo 05','0119876567','https://ofdollarsanddata.com/wp-content/uploads/2019/12/markets_trading.jpg'),
  //                   new Stock(2,'royal vintage2','id2','rangala2' ,'royalvintage@gmail.com2','colombo 052','0119876567','https://ofdollarsanddata.com/wp-content/uploads/2019/12/markets_trading.jpg')]
  constructor() { 
  }
  ngOnInit() {
  }
}
