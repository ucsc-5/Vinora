import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { OrderId,OrderService } from 'src/app/service/order.service';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-retailer-orders-for-stm',
  templateUrl: './retailer-orders-for-stm.component.html',
  styleUrls: ['./retailer-orders-for-stm.component.css']
})
export class RetailerOrdersForSTMComponent implements OnInit {

  @Input() order: OrderId
  items: Observable<CartItemId[]>

  constructor(private router:Router,private route:ActivatedRoute,private retailerService:RetailerService,private orderService:OrderService) { 

  }

  ngOnInit() {
    // console.log(this.order.id+" this is the retailer Id");
    this.items = this.orderService.getItemsByOrderId(this.order.id);      
  }

}