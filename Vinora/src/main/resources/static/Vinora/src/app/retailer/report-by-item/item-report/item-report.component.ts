import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { OrderService, OrderId } from 'src/app/service/order.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/service/report.service';
import { ItemService, ItemId, Item } from 'src/app/service/item.service';
import * as jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { RetailerService } from 'src/app/service/retailer.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-item-report',
  templateUrl: './item-report.component.html',
  styleUrls: ['./item-report.component.css']
})
export class ItemReportComponent implements OnInit {

  retailerItem: Item;
  items: Observable<ItemId[]>

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

  itemId: string;
  company: Observable<CompanyId[]>
  confirmedOrders:Observable<OrderId[]>;
  confirmedItems:Observable<ItemId>;
  retailerId;

  dateForm : FormGroup;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Royal Vintage','Company1'];// ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  // barChartColors=[{
  //   backgroundColor:['rgba(250,0,0,4,3)','rgba(0,255,0,0,3)','rgba(0,0,255,0,3)'],
  // }];

  barChartData: ChartDataSets[] = [{ data: [45, 56], label: 'Registered Companies' }];//[{ data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }];

  @ViewChild('content',{ static: true }) content:ElementRef;
  
  companyId: any;
 
  constructor(private router:Router,private route:ActivatedRoute,private afAuth: AngularFireAuth,private orderService: OrderService,private formBuilder:FormBuilder,private afs: AngularFirestore,private itemService:ItemService) { 
    this.retailerId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.itemId = param['itemId'];
    });

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });

  
   
    // this.item= this.itemService.getItemsByCompanyId(this.companyId);

    this.dateForm = this.formBuilder.group({
      fromDate:[ '',[
        Validators.required,
      ]],
      toDate: ['',[
        Validators.required
      ]]
    });


    
  }

  get fromdate(){
    return this.dateForm.get('fromDate');
  }

  get todate(){
    return this.dateForm.get('toDate');
  }


  public downloadPdf(){

    let doc = new jsPDF();
    let specialElementHandlers={
      '#editor' :function(element,renderer) {
        return true;
        
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('report.pdf');
  }

  
  onSearchDateRange(){

    this.specificDatetag=false;
    console.log(this.fromDate + " form date");
    console.log(this.toDate+ " To date");
    
    // this.route.params.subscribe((param:Params)=>{
    //   this.itemId = param['itemId'];})
    // this.afs.collection('retailers').doc(`${this.retailerId}`).collection('items').doc(`${this.itemId}`).get().subscribe(x=>{        
    //     const brand = x.data().brand;
    //     const category = x.data().category;
    //     const companyId = x.data().companyId;
    //     const description =x.data().description;
    //     const itemImagePath=x.data().itemImagePath;
    //     const itemName=x.data().itemName;
    //     const quantity=x.data().quantity;
    //     const reOrderingLevel=x.data().reOrderingLevel;
    //     const state=x.data().state;
    //     const type=x.data().type;
    //     const unitPrice=x.data().unitPrice;
    //     const unitValue=x.data().unitValue;
    //     const reOrder=x.data().reOrder;
    //     const itemCount=x.data().itemCount;

    //     console.log(itemCount);
    //     this.retailerItem = {brand,category,companyId,description,itemImagePath,itemName,quantity,reOrderingLevel,state,type,unitPrice,unitValue,reOrder,itemCount}

        // console.log("baaaaa"+this.retailerItem.itemName);
  // });



  this.items=this.itemService.getItemsByCompanyId(this.companyId);

  this.items.forEach(x=>{

          
    x.forEach(x2=>{
      console.log("llll"+x2.id);
      
       console.log(x2.itemName);
      })
    })

  }


}
