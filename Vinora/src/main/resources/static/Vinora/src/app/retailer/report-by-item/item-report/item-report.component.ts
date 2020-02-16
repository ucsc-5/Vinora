import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { OrderService, OrderId } from 'src/app/service/order.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/service/report.service';
import { ItemService } from 'src/app/service/item.service';
import * as jsPDF from 'jspdf';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-report',
  templateUrl: './item-report.component.html',
  styleUrls: ['./item-report.component.css']
})
export class ItemReportComponent implements OnInit {

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
  retailerId;

  dateForm : FormGroup;

  @ViewChild('content',{ static: true }) content:ElementRef;
  item: any;
  companyId: any;
 
  constructor(private router:Router,private companyService: CompanyService, private route:ActivatedRoute,private reportService:ReportService
    , private afAuth: AngularFireAuth,private orderService: OrderService,private formBuilder:FormBuilder,private itemService:ItemService) { 
    this.retailerId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.itemId = param['itemId'];
    });

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });

  
   
   
    this.item= this.itemService.getItemsByCompanyId(this.companyId);
  

    // this.confirmedOrders = this.orderService.getOrdersByRetailerIdCompanyId(this.retailerId,this.companyId);
    // this.confirmedOrders.subscribe(x=>{
    //   console.log(x);
      
    // });

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

  public onSubmitReport(){
    this.reportService.getreportByDate(this.fromdate.value,this.todate.value);
    this.orderService. getreportByDate(this.fromdate.value,this.todate.value,this.companyId,this.retailerId);
    this.orderService.getConformOrdersByDateRange(this.fromdate.value,this.todate.value,this.companyId,this.retailerId);
    // this.itemService.getItemReportsByDateRange(this.fromdate.value,this.todate.value,this.itemId,this.retailerId);
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
    
    // this.orders= this.orderService.getConformOrdersByDateRange(this.fromDate,this.toDate,this.companyId,this.stockManagerId);
    this.confirmedOrders= this.orderService. getreportByDate(this.fromDate,this.toDate,this.companyId,this.retailerId);

     this.confirmedOrders.subscribe(x=>{
      x.forEach(element=>{
        console.log(element);
      })
    })
  }


}
