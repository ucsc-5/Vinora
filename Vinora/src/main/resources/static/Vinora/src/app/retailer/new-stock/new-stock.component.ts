import { Component, OnInit } from '@angular/core';
import { RetailerStockService } from '../retailer-stock/retailer-stock.service';
import { Stock } from 'src/app/stock/stock.model';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css'],
  providers: [RetailerStockService]
})
export class NewStockComponent implements OnInit {

  
  selectedStock: Stock

  constructor(private retailerStockService: RetailerStockService) {
   }

  ngOnInit() {
    this.retailerStockService.stockSelected.subscribe(
      (stock:Stock)=>{
        this.selectedStock=stock;
      }
    )
  }

}
