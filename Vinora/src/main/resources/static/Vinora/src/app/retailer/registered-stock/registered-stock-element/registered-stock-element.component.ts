import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/service/stock.model';


@Component({
  selector: 'app-registered-stock-element',
  templateUrl: './registered-stock-element.component.html',
  styleUrls: ['./registered-stock-element.component.css']
})
export class RegisteredStockElementComponent implements OnInit {

  @Input()
  stock : Stock;
  constructor() { }

  ngOnInit() {
  }

}
