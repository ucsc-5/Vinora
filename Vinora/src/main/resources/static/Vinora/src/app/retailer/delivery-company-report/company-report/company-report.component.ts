import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReportService } from 'src/app/service/report.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-company-report',
  templateUrl: './company-report.component.html',
  styleUrls: ['./company-report.component.css']
})
export class CompanyReportComponent implements OnInit {


  @Input() company : CompanyId;
  retailerId:string;


  private dbPath = '/orders';

  

  dateForm : FormGroup;

  @ViewChild('content',{ static: true }) content:ElementRef;
 
  constructor(private router:Router,private companyService: CompanyService, private route:ActivatedRoute,private reportService:ReportService
    , private afAuth: AngularFireAuth,private orderService: OrderService,private formBuilder:FormBuilder) { 
   
  }

  ngOnInit() {
    // this.route.params.subscribe((param:Params)=>{
    //   this.companyId = param['companyId'];
    //});
   
   
  

    // this.confirmedOrders = this.orderService.getOrdersByRetailerIdCompanyId(this.retailerId,this.companyId);
    // this.confirmedOrders.subscribe(x=>{
    //   console.log(x);
      
    // });

  

  

    
  }

  





}
