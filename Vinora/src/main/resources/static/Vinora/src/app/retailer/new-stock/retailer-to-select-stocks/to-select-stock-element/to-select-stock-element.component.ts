import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';
import { RetailerStockService } from 'src/app/retailer/retailer-stock/retailer-stock.service';

@Component({
  selector: 'app-to-select-stock-element',
  templateUrl: './to-select-stock-element.component.html',
  styleUrls: ['./to-select-stock-element.component.css']
})
export class ToSelectStockElementComponent implements OnInit {

  @Input()
  stock: Stock;

  constructor(private retailerStockService:RetailerStockService) { }

  ngOnInit() {
  }

  onAdded(){
    this.retailerStockService.stockSelected.emit(this.stock);
    this.retailerStockService.addSelectedStock(this.stock);
  }

}
