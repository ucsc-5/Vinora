import { Component, OnInit, Input } from '@angular/core';
import { OrderId,OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { RetailerId,RetailerService } from 'src/app/service/retailer.service';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-asiigned-order-details',
  templateUrl: './asiigned-order-details.component.html',
  styleUrls: ['./asiigned-order-details.component.css']
})
export class AsiignedOrderDetailsComponent implements OnInit {

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
