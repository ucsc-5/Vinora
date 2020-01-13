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

  
  constructor(private afAuth: AngularFireAuth,private orderService:OrderService) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId;
    })
  }

  ngOnInit() {
   this.orders= this.orderService.getConfirmedOrdersByCompanyId(this.companyId);
  }
}
