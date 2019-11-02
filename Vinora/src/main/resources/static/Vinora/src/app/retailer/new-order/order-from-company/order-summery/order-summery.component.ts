import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/service/item.service';
import { OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.css']
})
export class OrderSummeryComponent implements OnInit {
  orderItems:Observable<OrderItem[]>;
  companyId:string;

  constructor(private orderService:OrderService, private route:ActivatedRoute) { }


  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
    this.orderItems= this.orderService.getItemsFromOrder(this.companyId);
  } 

}
