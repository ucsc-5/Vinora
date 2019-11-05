import { Component, OnInit } from '@angular/core';
import { StockManagerId, StockManagerService, StockManager } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-manager-profile',
  templateUrl: './stock-manager-profile.component.html',
  styleUrls: ['./stock-manager-profile.component.css']
})
export class StockManagerProfileComponent implements OnInit {

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;


  constructor(private StockManagerService:StockManagerService) { }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail);
  }

}
