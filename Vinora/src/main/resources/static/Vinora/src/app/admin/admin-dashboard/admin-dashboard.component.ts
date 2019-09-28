import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  requstCount: number;
  registeredCount: number;
  constructor(private companyServise:CompanyService) { 
    
  }

  ngOnInit() {
    this.companyServise.registeredCompanies$.subscribe(result => {this.registeredCount=result.length});
    this.companyServise.requestCompanies$.subscribe(result => {this.requstCount=result.length});   
  }

}
