import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { OrderService } from 'src/app/service/order.service';
import { OrderItem } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
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
