import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-confirmed-orders-of-retailers',
  templateUrl: './confirmed-orders-of-retailers.component.html',
  styleUrls: ['./confirmed-orders-of-retailers.component.css']
})
export class ConfirmedOrdersOfRetailersComponent implements OnInit {

  companyId: string;
  orders: Observable<OrderId[]>;
  stockManagerId: string;

  
  constructor(private afAuth: AngularFireAuth,private orderService:OrderService) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId;
      console.log(this.companyId);
    })
    this.stockManagerId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
   this.orders= this.orderService.getConfirmedOrdersByCompanyIdStockManagerId(this.companyId,this.stockManagerId);
  }
}
