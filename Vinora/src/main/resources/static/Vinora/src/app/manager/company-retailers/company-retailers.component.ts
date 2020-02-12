import { Component, OnInit } from '@angular/core';
import { RetailerEmailTokenId, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-company-retailers',
  templateUrl: './company-retailers.component.html',
  styleUrls: ['./company-retailers.component.css']
})
export class CompanyRetailersComponent implements OnInit {

  notRegisteredRetailersKey: Observable<Retailer[]>
  registeredRetailersKey: Observable<RetailerEmailTokenId[]>
  companyId:string;
  userId:string;
  userDetails: Observable<Retailer[]>
  constructor(private companyService:CompanyService,private afAuth: AngularFireAuth) { 
    this.companyId= this.afAuth.auth.currentUser.uid;
  }
    
  ngOnInit() {
    this.registeredRetailersKey= this.companyService.getRegisteredRetailers(this.companyId);
    this.notRegisteredRetailersKey = this.companyService.getNotRegRetailers(this.companyId);
    // this.userDetails= this.companyService.getRegisteredRetailerById(this.userId);
    // console.log(this.registeredRetailersKey)
    console.log(this.companyId)
    console.log(this.notRegisteredRetailersKey)
    
  }

  
}


