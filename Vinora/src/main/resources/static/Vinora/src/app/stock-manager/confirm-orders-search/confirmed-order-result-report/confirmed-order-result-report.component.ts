import { Component, OnInit, Input } from '@angular/core';
import { OrderService,OrderId,Order } from 'src/app/service/order.service';
import { Item } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { CartItemId,CartItem } from 'src/app/service/cart.service';

@Component({
  selector: 'app-confirmed-order-result-report',
  templateUrl: './confirmed-order-result-report.component.html',
  styleUrls: ['./confirmed-order-result-report.component.css']
})
export class ConfirmedOrderResultReportComponent implements OnInit {

  @Input() order:OrderId
  items: Observable<CartItemId[]>
  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    this.items.subscribe(
      x=>[
        x.forEach(element=>{
          console.log(element);
        })
      ]
    )
    console.log(this.order.id);
  }

}
