import { Component, OnInit, Input } from '@angular/core';
import { StockManager, StockManagerId } from 'src/app/service/stock-manager.service';

@Component({
  selector: 'app-display-stock-manager',
  templateUrl: './display-stock-manager.component.html',
  styleUrls: ['./display-stock-manager.component.css']
})
export class DisplayStockManagerComponent implements OnInit {

  @Input() stockManager:StockManagerId
  constructor() { }

  ngOnInit() {
  }

}
