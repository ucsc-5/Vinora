import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';

@Component({
  selector: 'app-stock-element',
  templateUrl: './stock-element.component.html',
  styleUrls: ['./stock-element.component.css']
})
export class StockElementComponent implements OnInit {

  @Input() 
  stock: Stock;

  constructor() { }

  ngOnInit() {
  }

}
