import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { CartService, CartItemId } from 'src/app/service/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-order-element',
  templateUrl: './current-order-element.component.html',
  styleUrls: ['./current-order-element.component.css']
})
export class CurrentOrderElementComponent implements OnInit {


  @Input() currentOrder: OrderId;
  company:Observable<CompanyId[]>;
  items:Observable<CartItemId[]>;
  
  constructor(private companyService:CompanyService,private orderService:OrderService) { }

  ngOnInit() {
    this.company= this.companyService.getCompanyById(this.currentOrder.companyId);
    this.items = this.orderService.getItemsByOrderId(this.currentOrder.id);
  }

}
