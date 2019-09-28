import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  company: Observable<any[]>;
  
  constructor(private companyService: CompanyService) {

   }

  ngOnInit() {
    this.company= this.companyService.company;
  }

}
