import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';
import { RetailerStockService } from '../../retailer-stock/retailer-stock.service';

@Component({
  selector: 'app-retailer-to-select-stocks',
  templateUrl: './retailer-to-select-stocks.component.html',
  styleUrls: ['./retailer-to-select-stocks.component.css']
})
export class RetailerToSelectStocksComponent implements OnInit {

  @Input() stock:Stock;

  retailerToSelectStocks: Stock[];
  constructor(private retailerStockService: RetailerStockService) { }

  ngOnInit() {
    this.retailerToSelectStocks= this.retailerStockService.getRetailerToSelectStocks();
  }

}
