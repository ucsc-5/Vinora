import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService, Order } from 'src/app/service/order.service';
import { StockManagerId } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItem, CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cur-order-element',
  templateUrl: './cur-order-element.component.html',
  styleUrls: ['./cur-order-element.component.css']
})
export class CurOrderElementComponent implements OnInit {

  @Input() stockManager: StockManagerId
  companyId:string;
  currentOrders: Observable<OrderId[]>
  retailers: Observable<RetailerId[]>
  items: Observable<CartItemId[]>

  constructor(private orderService:OrderService,private retailerServie:RetailerService) { }

  ngOnInit() {
    this.companyId=this.stockManager.companyId;
    this.currentOrders =this.orderService.getCurrentOrdersByCompanyId(this.companyId);
  }

  myfunction(){
    console.log(" the is the function");
  }
}
