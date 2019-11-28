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

  companyId: string;
  orders: Observable<OrderId[]>;

  
  constructor(private afAuth: AngularFireAuth,private stockManagerService:StockManagerService,private orderService:OrderService) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      // console.log(idTokenResult.claims.companyId);
      this.companyId= idTokenResult.claims.cmpId;
    })
  }

  ngOnInit() {
   this.orders= this.orderService.getCurrentOrdersByCompanyId(this.companyId);
  }

}
