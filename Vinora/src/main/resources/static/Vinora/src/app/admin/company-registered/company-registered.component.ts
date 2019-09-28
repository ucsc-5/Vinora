import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-registered',
  templateUrl: './company-registered.component.html',
  styleUrls: ['./company-registered.component.css']
})
export class CompanyRegisteredComponent implements OnInit {

  companies$: Observable<any[]>;
  
  constructor(private companyService:CompanyService) {
    this.companies$ = this.companyService.registeredCompanies$; 
   }

  ngOnInit() {
  }

}
