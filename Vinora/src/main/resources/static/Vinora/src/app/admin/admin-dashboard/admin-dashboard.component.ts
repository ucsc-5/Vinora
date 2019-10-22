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
  requstCount: number;
  registeredCount: number;
  constructor(private companyServise:CompanyService) { 
  }

  ngOnInit() {
  }
  
}
