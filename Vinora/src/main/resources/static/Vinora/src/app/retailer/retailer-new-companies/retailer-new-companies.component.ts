import { Component, OnInit } from '@angular/core';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService,RetailerId } from 'src/app/service/retailer.service';

@Component({
  selector: 'app-retailer-new-companies',
  templateUrl: './retailer-new-companies.component.html',
  styleUrls: ['./retailer-new-companies.component.css']
})
export class RetailerNewCompaniesComponent implements OnInit {

 
 
  myNotRegisteredCompanies: Observable<CompanyId[]>;
  pendigCompanies: Observable<CompanyId[]>;

  retailerId

  constructor(private retailerService:RetailerService,private companyServise: CompanyService,private afAuth: AngularFireAuth) { 
    this.retailerId = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit(){
    this.myNotRegisteredCompanies = this.retailerService.getMyNotRegisteredCompanies(this.retailerId);
    this.pendigCompanies =this.retailerService.getMyPendingRegisteredCompanies(this.retailerId); 
  }

}
