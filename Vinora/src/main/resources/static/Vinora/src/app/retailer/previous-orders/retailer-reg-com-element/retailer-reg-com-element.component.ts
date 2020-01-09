import { Component, OnInit, Input } from '@angular/core';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retailer-reg-com-element',
  templateUrl: './retailer-reg-com-element.component.html',
  styleUrls: ['./retailer-reg-com-element.component.css']
})
export class RetailerRegComElementComponent implements OnInit {

  @Input() company:CompanyId;

  retailerEmail: string;
  retailerUid: string;
  companyEmail: string;
  comapanyUid: string;
  registerCompanyName: string;


  constructor(private companyServise: CompanyService, private retailerService: RetailerService,private  afAuth:  AngularFireAuth,private router:Router,private route:ActivatedRoute) {
    this.retailerEmail= this.afAuth.auth.currentUser.email;
    this.retailerUid = this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
  }
 

  company_chart(company:CompanyId){
      this.router.navigate(['../','previousOrders',company.id,'chart'],{relativeTo: this.route});
      // this.router.navigate(['../','previousOrders','chart'],{relativeTo: this.route});
    
    }

}
