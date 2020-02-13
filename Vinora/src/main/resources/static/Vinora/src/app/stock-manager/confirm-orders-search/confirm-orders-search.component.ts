import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { OrderService,OrderId } from 'src/app/service/order.service';

@Component({
  selector: 'app-confirm-orders-search',
  templateUrl: './confirm-orders-search.component.html',
  styleUrls: ['./confirm-orders-search.component.css']
})
export class ConfirmOrdersSearchComponent implements OnInit {



  fromDate: Date;
  toDate: Date;
  orders: Observable<OrderId[]>;
  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.fromDate= new Date();
  }

  onSearch(){
    console.log(this.fromDate + " From date");
    console.log(this.toDate + " To date");
      
    this.orders= this.orderService.getConformOrderByDate(this.fromDate,this.toDate);  

    this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
  }

}
