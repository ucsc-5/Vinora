import { Component, OnInit, Input } from '@angular/core';
import { CompanyEmailToken } from 'src/app/service/retailer.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';
import { RetailerService,RetailerId } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-ret-reg-company-element',
  templateUrl: './ret-reg-company-element.component.html',
  styleUrls: ['./ret-reg-company-element.component.css']
})
export class RetRegCompanyElementComponent implements OnInit {

  @Input() company : CompanyId;
  retailerId:string;


  constructor(private  afAuth:  AngularFireAuth,private dialogService:DialogService,private retailerService:RetailerService,private companyService:CompanyService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.retailerId=this.afAuth.auth.currentUser.uid;
  }

  onHold(){
    const message="Confirm";
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.retailerService.HoldWithCompany(this.retailerId,this.company.id);}})
    
  }

  OrderNow(company:CompanyId){
    this.router.navigate(['../','companies',company.id],{relativeTo: this.route})
  }

}
