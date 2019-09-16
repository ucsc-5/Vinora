import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/service/stock.model';


@Component({
  selector: 'app-to-select-stock-element',
  templateUrl: './to-select-stock-element.component.html',
  styleUrls: ['./to-select-stock-element.component.css']
})
export class ToSelectStockElementComponent implements OnInit {

  @Input()
  stock: Stock;

  constructor() { }

  ngOnInit() {
  }

  onAdded(){

  }

}
