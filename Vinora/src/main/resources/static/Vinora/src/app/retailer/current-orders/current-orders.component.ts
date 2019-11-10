import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { CartItemId, CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit {


  currentOrders:Observable<OrderId[]>;
  retailerId:string;


  constructor(private afAuth: AngularFireAuth,private orderService:OrderService,private companyService:CompanyService,private cartService:CartService) { 
    this.retailerId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
  }

  getOrderByRetailerId(){
    this.currentOrders= this.orderService.getOrderByRetailerId(this.retailerId);
  }



}
