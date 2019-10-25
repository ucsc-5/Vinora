import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  company: Observable<any[]>
  requestCount: number;
  registeredCount: number;
  constructor(private companyServise:CompanyService) { 
  }

  ngOnInit() {
    this.companyServise.getRequestedCompanies();
    this.requestCount = this.companyServise.requestededCompanies.subscribe.length;
    console.log(this.requestCount+" request Count");
    this.companyServise.getRegisteredCompanies();
    this.registeredCount = this.companyServise.registeredCompanies.subscribe.length;
    console.log(this.registeredCount+" registered Count");
  }
  
}
