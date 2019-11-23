import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-con-order-element',
  templateUrl: './con-order-element.component.html',
  styleUrls: ['./con-order-element.component.css']
})
export class ConOrderElementComponent implements OnInit {

  @Input() order: OrderId
  companyId:string;
  retailers: Observable<RetailerId[]>
  items: Observable<CartItemId[]>
  orderId:string

  constructor(private orderService:OrderService,private retailerServie:RetailerService) { }

  ngOnInit() {
    this.retailers=this.retailerServie.getRetailerById(this.order.retailerId);
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    this.orderId=this.order.id;
  }

  
  // confirmOrder(){
  //   this.orderService.updateState(this.order.id,1);
  // }

}
