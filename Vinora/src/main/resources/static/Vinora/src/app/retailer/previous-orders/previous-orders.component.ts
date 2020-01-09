import { Component, OnInit } from '@angular/core';
import { CompanyEmailTokenId, RetailerService } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyId } from 'src/app/service/company.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {


  companies: Observable<CompanyId[]>;
  retailerId
  

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private retailerService:RetailerService) {
    this.retailerId= this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {

    this.companies = this.retailerService.getMyRegisteredCompanies(this.retailerId);
  }

}
