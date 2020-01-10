import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerService,RetailerId,RetailerEmailTokenId } from 'src/app/service/retailer.service';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-stock-manager-retailers',
  templateUrl: './stock-manager-retailers.component.html',
  styleUrls: ['./stock-manager-retailers.component.css']
})
export class StockManagerRetailersComponent implements OnInit {

  retailersTakens: Observable<RetailerEmailTokenId[]>
  companyId: string
  

  constructor(private companyService :CompanyService,private afAuth: AngularFireAuth) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      // console.log("This is the needed"+idTokenResult.claims.cmpId.cmpId);
      this.companyId= idTokenResult.claims.cmpId.cmpId;
    })
  }

  ngOnInit() {
    this.retailersTakens = this.companyService.getRegisteredRetailers(this.companyId);
  }

}
