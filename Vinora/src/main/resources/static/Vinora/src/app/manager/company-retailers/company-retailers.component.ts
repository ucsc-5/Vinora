import { Component, OnInit,Input } from '@angular/core';
import { RetailerEmailTokenId, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { CompanyService,CompanyId } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
// import { idTokenResult } from '@angular/fire/auth-guard';

@Component({
  selector: 'app-company-retailers',
  templateUrl: './company-retailers.component.html',
  styleUrls: ['./company-retailers.component.css']
})
export class CompanyRetailersComponent implements OnInit {

  retailerId: string
  companyId: string

  requestingRegRetailers: Observable<RetailerId[]>
  registeredRetailersKey: Observable<RetailerEmailTokenId[]>
  myCompany: Observable<CompanyId[]>

  // companyTempId:string;
  userId:string;
  userDetails: Observable<Retailer[]>
  constructor(private afs: AngularFirestore,private router: Router,private route:ActivatedRoute, private companyService:CompanyService,private afAuth: AngularFireAuth) { 
    this.companyId= this.afAuth.auth.currentUser.uid;
  }
    
  ngOnInit() {
    this.requestingRegRetailers = this.companyService.getRequestingRegRetailers(this.companyId);
    this.myCompany=this.companyService.getCompanyById(this.companyId);

    this.registeredRetailersKey= this.companyService.getRegisteredRetailers(this.companyId);
    this.registeredRetailersKey.subscribe(res=>{
      res.forEach(element=>{
        console.log(element);
      })
    })
  }

  onSelect(notRegRet:RetailerId){
    console.log(notRegRet.id);
    this.router.navigate([notRegRet.id],{relativeTo: this.route})
    
  }
// commit
  
}


