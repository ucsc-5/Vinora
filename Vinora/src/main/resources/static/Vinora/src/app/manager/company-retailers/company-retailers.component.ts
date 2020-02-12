import { Component, OnInit } from '@angular/core';
import { RetailerEmailTokenId, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
// import { idTokenResult } from '@angular/fire/auth-guard';

@Component({
  selector: 'app-company-retailers',
  templateUrl: './company-retailers.component.html',
  styleUrls: ['./company-retailers.component.css']
})
export class CompanyRetailersComponent implements OnInit {

  retailerId: string
  companyId: string

  notRegisteredRetailersKey: Observable<RetailerId[]>
  registeredRetailersKey: Observable<RetailerEmailTokenId[]>

  // companyTempId:string;
  userId:string;
  userDetails: Observable<Retailer[]>
  constructor(private router: Router,private route:ActivatedRoute, private companyService:CompanyService,private afAuth: AngularFireAuth) { 
    this.companyId= this.afAuth.auth.currentUser.uid;

    this.afAuth.auth.currentUser.getIdTokenResult().then(idTokenResult)=>{
      this.companyId = idTokenResult.claims.cmpId;
    }
  }
    
  ngOnInit() {
    // this.registeredRetailersKey= this.companyService.getRegisteredRetailers(this.companyId);
    this.notRegisteredRetailersKey = this.companyService.getNotRegRetailers(this.companyId);
    // this.userDetails= this.companyService.getRegisteredRetailerById(this.userId);
    // console.log(this.registeredRetailersKey)
    console.log(this.companyId)
    console.log(this.notRegisteredRetailersKey)

    this.notRegisteredRetailersKey.subscribe(res=>{
      res.forEach(element=>{
        console.log(element);
      })
    })
    
  }

  onSelect(notRegRet:RetailerId){
    console.log(notRegRet.id);
    this.router.navigate([notRegRet.id],{relativeTo: this.route})
  }

  
}


