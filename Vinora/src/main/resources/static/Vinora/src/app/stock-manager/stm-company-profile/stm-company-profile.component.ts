import { Component, OnInit } from '@angular/core';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-stm-company-profile',
  templateUrl: './stm-company-profile.component.html',
  styleUrls: ['./stm-company-profile.component.css']
})
export class StmCompanyProfileComponent implements OnInit {

  companies: Observable<CompanyId[]>;
  companyId

  constructor(private companyService: CompanyService,private afAuth: AngularFireAuth) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      // console.log("This is the needed"+idTokenResult.claims.cmpId.cmpId);
      this.companyId= idTokenResult.claims.cmpId;
    })
  }
  ngOnInit(){
    this.companies = this.companyService.getCompanyById(this.companyId)
  }


}
