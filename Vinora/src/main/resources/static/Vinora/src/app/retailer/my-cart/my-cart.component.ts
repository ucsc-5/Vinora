import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { OrderService } from 'src/app/service/order.service';
import { OrderItem } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  orderItems:Observable<OrderItem[]>;
  companyId:string;
  retailerId: string;

  constructor(private orderService:OrderService, private route:ActivatedRoute,private afAuth: AngularFireAuth) { 
    this.retailerId= this.afAuth.auth.currentUser.uid;
  }


  ngOnInit() {

    console.log(this.companyId);
    this.orderItems= this.orderService.getItemsFromOrderByRetailerId(this.retailerId);
  } 

}
