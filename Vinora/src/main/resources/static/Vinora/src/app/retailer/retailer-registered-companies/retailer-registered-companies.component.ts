import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService } from 'src/app/service/retailer.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
@Component({
  selector: 'app-retailer-registered-companies',
  templateUrl: './retailer-registered-companies.component.html',
  styleUrls: ['./retailer-registered-companies.component.css']
})
export class RetailerRegisteredCompaniesComponent implements OnInit {

  companies: Observable<CompanyId[]>;
  retailerId

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private companyService:CompanyService) {

    this.retailerId = this.afAuth.auth.currentUser.uid;
   
   }

  ngOnInit() {
    this.companies= this.companyService.getAllCompany();
    this.companies.forEach(x=>{console.log(x)})
  }
}
