import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService, Order } from 'src/app/service/order.service';
import { StockManagerId } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItem, CartItemId } from 'src/app/service/cart.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cur-order-element',
  templateUrl: './cur-order-element.component.html',
  styleUrls: ['./cur-order-element.component.css']
})
export class CurOrderElementComponent implements OnInit {

  @Input() order: OrderId
  companyId:string;
  currentOrders: Observable<OrderId[]>
  retailers: Observable<RetailerId[]>
  items: Observable<CartItemId[]>
  orderId
  stockManagerId:string;

  constructor(private orderService:OrderService,private afAuth: AngularFireAuth,private retailerServie:RetailerService) { }

  ngOnInit() {
    this.retailers=this.retailerServie.getRetailerById(this.order.retailerId);
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    this.orderId=this.order.id;
    this.stockManagerId=this.afAuth.auth.currentUser.uid;
    
  }

  confirmOrder(){
    this.orderService.updateState(this.order.id,0,this.stockManagerId);
    this.items.forEach(x=>{
      x.forEach(x2=>{
        console.log(x2.id);
        this.orderService.setStmAddedFeild(this.orderId,x2.id); 
      })
    })



  }




  
}
