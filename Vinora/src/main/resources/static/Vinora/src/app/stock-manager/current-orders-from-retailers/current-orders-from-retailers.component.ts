import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { StockManagerService, StockManagerId } from 'src/app/service/stock-manager.service';

@Component({
  selector: 'app-current-orders-from-retailers',
  templateUrl: './current-orders-from-retailers.component.html',
  styleUrls: ['./current-orders-from-retailers.component.css']
})
export class CurrentOrdersFromRetailersComponent implements OnInit {

  stockManagers:Observable<StockManagerId[]>;
  stockManagerEmail:string;
  
  constructor(private afAuth: AngularFireAuth,private stockManagerService:StockManagerService) {
    this.stockManagerEmail=this.afAuth.auth.currentUser.email;
  }

  ngOnInit() {
    this.stockManagers=this.stockManagerService.getStockManagerByEmail(this.stockManagerEmail);
  }

}
