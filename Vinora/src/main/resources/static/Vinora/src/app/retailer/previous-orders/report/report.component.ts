import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyId, CompanyService, Company } from 'src/app/service/company.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReportService } from 'src/app/service/report.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { OrderId, OrderService } from 'src/app/service/order.service';
import * as jsPDF from 'jspdf';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  companyId: string;
  
  company: Observable<CompanyId[]>
  confirmedOrders:Observable<OrderId[]>;
  retailerId;

  dateForm : FormGroup;

  @ViewChild('content',{ static: true }) content:ElementRef;
 
  constructor(private router:Router,private companyService: CompanyService, private route:ActivatedRoute,private reportService:ReportService, private afAuth: AngularFireAuth,private orderService: OrderService,private formBuilder:FormBuilder) { 
    this.retailerId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
   
   
    this.company= this.companyService.getCompanyById(this.companyId);
  

    this.confirmedOrders = this.orderService.getOrdersByRetailerIdCompanyId(this.retailerId,this.companyId);
    this.confirmedOrders.subscribe(x=>{
      console.log(x);
      
    });

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

  get toDate(){
    return this.dateForm.get('toDate');
  }

  public onSubmitReport(){
    this.reportService.getreportByDate(this.fromdate.value,this.toDate.value)
    // .subscribe((result)=>{
    //   console.log(result);
    //   // this.report = result as Report[];
    // })
    ;
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

}
