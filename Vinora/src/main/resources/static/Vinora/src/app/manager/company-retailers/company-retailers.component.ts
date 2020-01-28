import { Component, OnInit } from '@angular/core';
import { RetailerEmailTokenId, Retailer } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-company-retailers',
  templateUrl: './company-retailers.component.html',
  styleUrls: ['./company-retailers.component.css']
})
export class CompanyRetailersComponent implements OnInit {

  registeredRetailersKey: Observable<RetailerEmailTokenId[]>
  companyId;
  userId;
  userDetails: Observable<Retailer[]>
  constructor(private companyService:CompanyService,private afAuth: AngularFireAuth) { 
    this.companyId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.registeredRetailersKey= this.companyService.getRegisteredRetailers(this.companyId);
    // this.userDetails= this.companyService.getRegisteredRetailerById(this.userId);

    console.log(this.companyId)
    
  }

  
}


