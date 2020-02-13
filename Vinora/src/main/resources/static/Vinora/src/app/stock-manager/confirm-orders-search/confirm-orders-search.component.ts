import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { OrderService,OrderId } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-confirm-orders-search',
  templateUrl: './confirm-orders-search.component.html',
  styleUrls: ['./confirm-orders-search.component.css']
})
export class ConfirmOrdersSearchComponent implements OnInit {



  fromDate: Date;
  toDate: Date;
  specificDate: Date;
  total: number = 0 ;
  orders: Observable<OrderId[]>;
  month = '1';
  companyId:string;
  stockManagerId:string;
  constructor(private orderService:OrderService,private afAuth: AngularFireAuth) {
    this.stockManagerId=this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      console.log(idTokenResult);
      this.companyId= idTokenResult.claims.cmpId;
    })
   }

  ngOnInit() {
    this.fromDate= new Date();
  }

  onSearch(){
    console.log(this.fromDate + " From date");
    console.log(this.toDate + " To date");
      
    console.log(this.month+ " month ");

    console.log(this.specificDate+" specific date");

    console.log(this.total+" tatal value");
    
    
    this.orders= this.orderService.getConformOrderByDateRange(this.fromDate,this.toDate,this.companyId,this.stockManagerId);  

    // this.orders= this.orderService.getConformOrderByDate(this.specificDate,this.companyId,this.stockManagerId);  
    

    this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
  }

}
