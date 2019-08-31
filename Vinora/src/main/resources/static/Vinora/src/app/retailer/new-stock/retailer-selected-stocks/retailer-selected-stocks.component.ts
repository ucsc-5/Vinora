import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';
import { RetailerStockService } from '../../retailer-stock/retailer-stock.service';

@Component({
  selector: 'app-retailer-selected-stocks',
  templateUrl: './retailer-selected-stocks.component.html',
  styleUrls: ['./retailer-selected-stocks.component.css']
})
export class RetailerSelectedStocksComponent implements OnInit {

  @Input() stock:Stock
  
  retailerSelectedStocks: Stock[];

  constructor(private retailerStockService: RetailerStockService) { }

  ngOnInit() {
    this.retailerSelectedStocks= this.retailerStockService.getRetailerSelectedStocks();
  }

}
