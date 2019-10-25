import { Component, OnInit } from '@angular/core';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-retailer-new-companies',
  templateUrl: './retailer-new-companies.component.html',
  styleUrls: ['./retailer-new-companies.component.css']
})
export class RetailerNewCompaniesComponent implements OnInit {

 
 
  companies: Observable<CompanyId[]>;
  retailerId

  constructor(private companyServise: CompanyService,private afAuth: AngularFireAuth) { 
    this.retailerId = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.companies= this.companyServise.getRegisteredCompany();
  }

}
