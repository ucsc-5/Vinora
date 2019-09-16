import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/service/stock.model';


@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css'],
  providers: []
})
export class NewStockComponent implements OnInit {

  
  selectedStock: Stock

  constructor() {
   }

  ngOnInit() {
  }

}
