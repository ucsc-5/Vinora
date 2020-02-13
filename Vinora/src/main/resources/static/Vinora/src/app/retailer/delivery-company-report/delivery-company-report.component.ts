import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyId } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService } from 'src/app/service/retailer.service';

@Component({
  selector: 'app-delivery-company-report',
  templateUrl: './delivery-company-report.component.html',
  styleUrls: ['./delivery-company-report.component.css']
})
export class DeliveryCompanyReportComponent implements OnInit {

  companies: Observable<CompanyId[]>
  retailerId: string;

  constructor(private afAuth:AngularFireAuth,private retailerService:RetailerService) {
    this.retailerId = this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {

    this.companies = this.retailerService.getMyRegisteredCompanies(this.retailerId);
  }

}
