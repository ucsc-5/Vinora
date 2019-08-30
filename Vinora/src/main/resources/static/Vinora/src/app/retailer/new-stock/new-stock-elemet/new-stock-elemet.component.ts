import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';

@Component({
  selector: 'app-new-stock-elemet',
  templateUrl: './new-stock-elemet.component.html',
  styleUrls: ['./new-stock-elemet.component.css']
})
export class NewStockElemetComponent implements OnInit {

  @Input()
  stock = Stock;
  @Input()
  i : number;

  constructor() { }

  ngOnInit() {
  }

}
