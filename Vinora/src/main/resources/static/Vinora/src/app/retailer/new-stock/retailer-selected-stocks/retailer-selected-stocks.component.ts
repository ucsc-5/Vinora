import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/service/stock.model';


@Component({
  selector: 'app-retailer-selected-stocks',
  templateUrl: './retailer-selected-stocks.component.html',
  styleUrls: ['./retailer-selected-stocks.component.css']
})
export class RetailerSelectedStocksComponent implements OnInit {

  @Input() stock:Stock
  
  retailerSelectedStocks: Stock[];

  constructor() { }

  ngOnInit() {

  }

}
