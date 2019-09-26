import { Component, OnInit,Input } from '@angular/core';
import { Stock } from 'src/app/service/stock.model';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-admin-stock-element',
  templateUrl: './admin-stock-element.component.html',
  styleUrls: ['./admin-stock-element.component.css']
})
export class AdminStockElementComponent implements OnInit {

  @Input() stock: Stock;
  
  constructor(private stockService:StockService) {
    // console.log(this.stock.key);
   }

  ngOnInit() {
  }

  onConfirm(){
  //   this.stockService.updateStock(this.stock.key, {state:"1"})
  //     .catch(err => console.log(err+"jkdcjdscjsdbc"));

  }

}
