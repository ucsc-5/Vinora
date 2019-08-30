import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';
import { Manager } from 'src/app/manager/manager.model';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css']
})
export class NewStockComponent implements OnInit {

  
  stocks: Stock[]=[new Stock(1,'royal vintage','id','rangala' ,'royalvintage@gmail.com','colombo 05','0119876567','https://ofdollarsanddata.com/wp-content/uploads/2019/12/markets_trading.jpg')]
  
  constructor() {

    console.log(this.stocks[0]);
   }

  ngOnInit() {
  }

}
