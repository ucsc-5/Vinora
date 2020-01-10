import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReportService } from 'src/app/service/report.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { OrderId, OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  companyId: string;

  company: Observable<CompanyId[]>
  confirmedOrders:Observable<OrderId[]>;
  @Input() confirmOrder: OrderId;
  retailerId;
 
  constructor(private router:Router,private companyService: CompanyService, private route:ActivatedRoute,private reportService:ReportService, private afAuth: AngularFireAuth,private orderService: OrderService) { 
    this.retailerId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
   
   
    this.company= this.companyService.getCompanyById(this.companyId);

    // this.reportService.getreportdetails(this.companyId).subscribe{

    // }

    this.confirmedOrders = this.orderService.getOrdersByRetailerIdCompanyId(this.retailerId,this.companyId);
    this.confirmedOrders.subscribe(x=>{
      console.log(x);
      
    });

    // this.company = this.companyService.getCompanyById(this.confirmOrder.companyId);
    // this.company.subscribe(y=>{
    //   console.log("hashini"+y);
      
    // });

    console.log(this.confirmOrder.createDate);
  }

}
