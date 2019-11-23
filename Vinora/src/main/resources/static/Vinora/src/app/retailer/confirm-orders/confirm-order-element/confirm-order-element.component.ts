import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { CartItem } from 'src/app/service/cart.service';

@Component({
  selector: 'app-confirm-order-element',
  templateUrl: './confirm-order-element.component.html',
  styleUrls: ['./confirm-order-element.component.css']
})
export class ConfirmOrderElementComponent implements OnInit {


  @Input() confirmOrder: OrderId;
  company:Observable<CompanyId[]>;
  items:Observable<CartItem[]>;

  
  constructor(private companyService: CompanyService,private orderService:OrderService) { }

  ngOnInit() {
    console.log(this.confirmOrder.createDate);
    
    this.company = this.companyService.getCompanyById(this.confirmOrder.companyId);
    this.items = this.orderService.getItemsByOrderId(this.confirmOrder.id);

  }

}
