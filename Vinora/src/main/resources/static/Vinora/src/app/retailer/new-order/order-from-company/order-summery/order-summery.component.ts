import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/service/item.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.css']
})
export class OrderSummeryComponent implements OnInit {
  orderItems:OrderItem[];

  constructor(private orderService:OrderService) { }


  ngOnInit() {
    this.orderItems= this.orderService.orderItems;
  }

}
