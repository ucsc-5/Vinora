import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService, CompanyEmailTokenId } from 'src/app/service/retailer.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
@Component({
  selector: 'app-retailer-registered-companies',
  templateUrl: './retailer-registered-companies.component.html',
  styleUrls: ['./retailer-registered-companies.component.css']
})
export class RetailerRegisteredCompaniesComponent implements OnInit {


  companyEmails: Observable<CompanyEmailTokenId[]>
  retailerId: string;


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private retailerService:RetailerService) {

    this.retailerId= this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
    this.companyEmails=this.retailerService.getRegisteredAllCompanies(this.retailerId);
    
  }

}
