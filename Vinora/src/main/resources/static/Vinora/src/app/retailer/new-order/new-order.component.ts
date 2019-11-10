import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService, CompanyEmailTokenId } from 'src/app/service/retailer.service';
import { CompanyService, CompanyId, Company } from 'src/app/service/company.service';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  registeredCompaniesEmails: Observable<CompanyEmailTokenId[]>
  companies: Observable<CompanyId[]>
  retailerId

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private companyService: CompanyService, private retailerService:RetailerService) {
    this.retailerId = this.afAuth.auth.currentUser.uid;
  }


  ngOnInit() {
    this.registeredCompaniesEmails = this.retailerService.getRegisteredAllCompanies(this.retailerId);
  }



}
