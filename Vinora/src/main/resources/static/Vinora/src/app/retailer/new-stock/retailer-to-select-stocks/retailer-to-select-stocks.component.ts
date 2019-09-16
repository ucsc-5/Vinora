import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/service/stock.model';


@Component({
  selector: 'app-retailer-to-select-stocks',
  templateUrl: './retailer-to-select-stocks.component.html',
  styleUrls: ['./retailer-to-select-stocks.component.css']
})
export class RetailerToSelectStocksComponent implements OnInit {

  @Input() stock:Stock;

  retailerToSelectStocks: Stock[];
  constructor() { }

  ngOnInit() {

  }

}
