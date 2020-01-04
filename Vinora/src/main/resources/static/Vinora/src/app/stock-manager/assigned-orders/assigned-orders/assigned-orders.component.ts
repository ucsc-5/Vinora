import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItemId } from 'src/app/service/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.css']
})
export class AssignedOrdersComponent implements OnInit {

  @Input() order: OrderId;
  retailers: Observable<RetailerId[]>;
  items: Observable<CartItemId[]>;
  constructor(private orderService:OrderService,private retailerServie:RetailerService) {

   }

  ngOnInit() {
    this.retailers = this.retailerServie.getRetailerById(this.order.retailerId);
    this.items = this.orderService.getItemsByOrderId(this.order.id);
  }

}
