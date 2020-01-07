import { Component, OnInit } from '@angular/core';
import { CompanyEmailTokenId, RetailerService } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {


  companyEmails: Observable<CompanyEmailTokenId[]>
  retailerId: string;
  

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private retailerService:RetailerService) {
    this.retailerId= this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {

    this.companyEmails=this.retailerService.getRegisteredAllCompanies(this.retailerId);
  }

}
