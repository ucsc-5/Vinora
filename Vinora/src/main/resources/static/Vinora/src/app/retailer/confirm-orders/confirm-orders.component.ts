import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-confirm-orders',
  templateUrl: './confirm-orders.component.html',
  styleUrls: ['./confirm-orders.component.css']
})
export class ConfirmOrdersComponent implements OnInit {

  confirmedOrders:Observable<OrderId[]>;
  retailerId:string;

  constructor(private afAuth: AngularFireAuth,private orderService: OrderService) {
    this.retailerId = this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
    this.confirmedOrders = this.orderService.getConfirmedOrdersByRetailerId(this.retailerId);
    this.confirmedOrders.subscribe(x=>{
      console.log(x);
      
    })
  }


}
