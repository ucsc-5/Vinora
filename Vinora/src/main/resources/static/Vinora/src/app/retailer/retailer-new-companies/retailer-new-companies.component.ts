import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-retailer-new-companies',
  templateUrl: './retailer-new-companies.component.html',
  styleUrls: ['./retailer-new-companies.component.css']
})
export class RetailerNewCompaniesComponent implements OnInit {

 
  companies: Observable<Company[]>;
  constructor(private companyServise: CompanyService) { 

  }

  ngOnInit() {
    // this.companies= this.companyServise.getAllCompany();
  }

}
