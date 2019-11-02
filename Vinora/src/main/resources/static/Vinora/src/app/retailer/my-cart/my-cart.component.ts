import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { OrderService } from 'src/app/service/order.service';
import { OrderItem } from 'src/app/service/item.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {


  orderItems: OrderItem[];

  constructor(db: AngularFireDatabase, private orderService:OrderService) {
       
      }

  ngOnInit() {
    
    this.orderItems = this.orderService.orderItems;
    console.log(this.orderItems.forEach(x=>{x}));

  }

}
