import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { OrderService,OrderId,Order } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService,RetailerId,RetailerEmailTokenId } from 'src/app/service/retailer.service';
import { CompanyService } from 'src/app/service/company.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-confirm-orders-search',
  templateUrl: './confirm-orders-search.component.html',
  styleUrls: ['./confirm-orders-search.component.css']
})
export class ConfirmOrdersSearchComponent implements OnInit {
  @ViewChild('content1',{ static: true }) content1:ElementRef;

  months = ['January','February','March','April','MAy','June','July','August','September','November','December'];

  report: boolean = false;

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
    this.dateRangeTag = true;
    this.yearMonthTag = false;
    this.retailerTag = false;
    this.totalRangeTag = false;
    this.specificDatetag = false;

    var dateMin = this.fromDate.getDate();
    var monthMin = this.fromDate.getMonth()+1;
    var yearMin = this.fromDate.getFullYear();
    var encDateMin = (yearMin*10000)+(monthMin*100)+(dateMin);

    var dateMax = this.toDate.getDate();
    var monthMax = this.toDate.getMonth()+1;
    var yearMax = this.toDate.getFullYear();
    var encDateMax = (yearMax*10000)+(monthMax*100)+(dateMax);

    console.log("From"+encDateMin);
    
    console.log("To"+encDateMax);
    this.orders= this.afs.collection('companies').doc(this.companyId).collection('confirmedOrders',ref=>ref.where('encDate','<=',encDateMax).where('encDate','>=',encDateMin))
    .snapshotChanges().pipe(
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

  }

  onSearchDate(){
    this.dateRangeTag = false;
    this.yearMonthTag = false;
    this.retailerTag = false;
    this.totalRangeTag = false;
    this.specificDatetag = true;

    var date = this.specificDate.getDate();
    var month = this.specificDate.getMonth()+1;
    var year = this.specificDate.getFullYear();
    var encDate = (year*10000)+(month*100)+(date);

  

    console.log(encDate);
    
    this.orders= this.afs.collection('companies').doc(this.companyId).collection('confirmedOrders',ref=>ref.where('encDate','==',encDate))
    .snapshotChanges().pipe(
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

    this.dateRangeTag = false;
    this.yearMonthTag = true;
    this.retailerTag = false;
    this.totalRangeTag = false;
    this.specificDatetag = false;

    console.log(this.year);
    // console.log(this.monthIndex);
    var month = +this.monthIndex;
    var year = +this.year
    console.log(month);
    
    this.orders= this.afs.collection('companies').doc(this.companyId).collection('confirmedOrders',ref=>ref.where('month','==',month).where('year','==',year))
    .snapshotChanges().pipe(
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
  }

  onSearchRetailer(){

    this.dateRangeTag = false;
    this.yearMonthTag = false;
    this.retailerTag = true;
    this.totalRangeTag = false;
    this.specificDatetag = false;


    console.log(this.selectRetailer.value.retailer);
    var retailerId = this.selectRetailer.value.retailer;
    this.orders= this.afs.collection('companies').doc(this.companyId).collection('confirmedOrders',ref=>ref.where('retailerId','==',retailerId))
      .snapshotChanges().pipe(
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

    this.dateRangeTag = false;
    this.yearMonthTag = false;
    this.retailerTag = false;
    this.totalRangeTag = true;
    this.specificDatetag = false;

    var min = +this.totalMin;
    var max = +this.totalMax;
    this.orders= this.afs.collection('companies').doc(this.companyId).collection('confirmedOrders',ref=>ref.where('total','<=',max).where('total','>=',min))
      .snapshotChanges().pipe(
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

  onReport(){
    this.report=!this.report;
  }



    public requestedDownloadPdf(){
      console.log("Report Generated");
      

      let doc = new jsPDF();
      let specialElementHandlers={
        '#editor' :function(element,renderer) {
          return true;
          
        }
      };
      let content1 = this.content1.nativeElement;
      doc.fromHTML(content1.innerHTML,20,20,{
        'width':190,
        'elementHandlers':specialElementHandlers
      });
      doc.save('report.pdf');      
    }
  

}
