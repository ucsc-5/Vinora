import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { OrderService,OrderId } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService,RetailerId,RetailerEmailTokenId } from 'src/app/service/retailer.service';
import { CompanyService } from 'src/app/service/company.service';
@Component({
  selector: 'app-confirm-orders-search',
  templateUrl: './confirm-orders-search.component.html',
  styleUrls: ['./confirm-orders-search.component.css']
})
export class ConfirmOrdersSearchComponent implements OnInit {


  months = ['January','February','March','April','MAy','June','July','August','September','November','December'];

  disabled = false;
  fromDate: Date;
  toDate: Date;
  specificDate: Date;


  totalMax: number = 0;
  totalMin: number = 0;
  orders: Observable<OrderId[]>;


  dateRangeTag = false;
  yearMonthTag = false;
  retailerTag = false;
  totalRangeTag = false;
  specificDatetag = false;

  monthIndex:number;
  year:number;
  companyId:string;
  stockManagerId:string;
  retailer: string;
  selectRetailer: FormGroup;
  selectedRetailerId: string;


  retailersTakens: Observable<RetailerEmailTokenId[]>

  constructor(private orderService:OrderService,private companyService:CompanyService,private afAuth: AngularFireAuth,private retailerService:RetailerService) {
    this.stockManagerId=this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId;
    })
   }

  ngOnInit() {
    this.fromDate= new Date();
    console.log("sdhcbkhsdbchsdk");
    
    this.retailersTakens = this.companyService.getRegisteredRetailers(this.companyId);
    this.retailersTakens.subscribe(x2=>[
      x2.forEach(element=>{
        console.log(element);
      })
    ])

    this.selectRetailer = new FormGroup({
      'retailer': new FormControl(null,[Validators.required])
    })
  }

  onSearch(){
    console.log(this.dateRangeTag+" dateRange");
    console.log(this.yearMonthTag+" yearMonthTag");
    console.log(this.retailerTag+" retailerTag");
    console.log(this.totalRangeTag+" totalRangeTag");
    console.log(this.specificDatetag+" specificDatetag");



    // console.log(this.fromDate + " From date");
    // console.log(this.toDate + " To date");
      
    // console.log(this.month+ " month ");

    // console.log(this.specificDate+" specific date");

    // console.log(this.totalMax+" tatal value");
    // console.log(this.totalMin+" tatal value");
    
    
    // this.orders= this.orderService.getConformOrderByDateRange(this.fromDate,this.toDate,this.companyId,this.stockManagerId);  

    // // this.orders= this.orderService.getConformOrderByDate(this.specificDate,this.companyId,this.stockManagerId);  
    

    // this.orders.subscribe(x=>{
    //   x.forEach(element=>{
    //     console.log(element);
    //   })
    // })
  }


  onSearchDateRange(){
    this.specificDatetag=false;
    console.log(this.fromDate + " form date");
    console.log(this.toDate+ " To date");
    
    this.orders= this.orderService.getConformOrdersByDateRange(this.fromDate,this.toDate,this.companyId,this.stockManagerId);

     this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
  }

  onSearchDate(){
    this.dateRangeTag=false;
    this.orders= this.orderService.getConformOrderByDateStockManagerId(this.specificDate,this.companyId,this.stockManagerId);
    this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
    console.log("on Search date");
  }

  onSearchYearMonth(){
    console.log(this.year+"year");
    console.log(this.months[this.monthIndex]);
    this.orders= this.orderService.getConformOrderByYearMonthStockManagerId(this.year,this.monthIndex,this.companyId,this.stockManagerId);
    this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
    console.log("on Search date");
  }

  onSearchRetailer(){
    this.retailersTakens.subscribe(x=>{
      x.forEach(ele=>{
        console.log(ele);
        
      })
    })
    
    console.log(this.selectedRetailerId);
    
  }

  onSearchTotalRange(){

  }


}
