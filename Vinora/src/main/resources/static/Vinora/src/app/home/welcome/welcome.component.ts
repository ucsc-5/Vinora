import { Component, OnInit } from '@angular/core';
import { OrderService,OrderId } from 'src/app/service/order.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  orders: Observable<OrderId[]>;
  fromDate: Date;
  toDate: Date;
  constructor(private orderService:OrderService) { }

  ngOnInit() {
    console.log("Welocme"); 
  }

  onSearch(){
    console.log(this.fromDate + " From date");
    console.log(this.toDate + " To date");
      
    // this.orders= this.orderService.getConformOrderByDate(this.fromDate,this.toDate);  

    this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
  }

  

}
