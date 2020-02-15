import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { OrderService,OrderId,Order } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService,RetailerId,RetailerEmailTokenId } from 'src/app/service/retailer.service';
import { CompanyService } from 'src/app/service/company.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';



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

  private dbPath = '/orders';

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



  retailersTakens: Observable<RetailerEmailTokenId[]>

  constructor(private afs: AngularFirestore,private db: AngularFireDatabase,private orderService:OrderService,private companyService:CompanyService,private afAuth: AngularFireAuth,private retailerService:RetailerService) {
    this.stockManagerId=this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId;
    })
   }

  ngOnInit() {
    this.fromDate= new Date();    
    this.retailersTakens = this.companyService.getRegisteredRetailers(this.companyId);
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
    let date = this.specificDate.getDate();
    let month = this.specificDate.getMonth()+1;
    let year = this.specificDate.getFullYear();
    var encDate = (year*10000)+(month*100)+(date);

    console.log(encDate);
    
    this.orders = this.afs.collection('orders',ref=>ref.where('encDate','==',encDate).where('state','==',0).where('companyId','==',this.companyId)).snapshotChanges().pipe(
      map(actions => actions.map(a => { 
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
    console.log("on Search date");
  }

  onSearchYearMonth(){
    console.log(this.year);

    console.log(this.monthIndex);
    
    // console.log(this.months[this.monthIndex]);

    // this.orders = this.afs.collection('companies').doc(this.companyId).collection('confirmOrders',ref=>ref.where('year','==',this.year).where('month','==',this.months[this.monthIndex])).snapshotChanges().pipe(
    this.orders = this.afs.collection('orders',ref=>ref.where('year','==',this.year).where('month','==',this.monthIndex)).snapshotChanges().pipe(
     
      map(actions => actions.map(a => { 
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.orders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
    console.log("on Search date");
  }

  onSearchRetailer(){
    console.log(this.selectRetailer.value.retailer);
    var retailerId = this.selectRetailer.value.retailer;

    // this.orders = this.afs.collection('companies').doc(this.companyId).collection('confirmOrders',ref=>ref.where('retailerId','==',this.retailer)).snapshotChanges().pipe(
      this.orders = this.afs.collection('orders',ref=>ref.where('retailerId','==',retailerId)).snapshotChanges().pipe(
        map(actions => actions.map(a => { 
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.orders.subscribe(x=>{
      x.forEach(ele=>{
        console.log(ele);
      })
    })
  }

  onSearchTotalRange(){

  }


}
