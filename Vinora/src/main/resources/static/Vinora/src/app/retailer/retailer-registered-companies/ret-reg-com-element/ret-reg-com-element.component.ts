import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { RetailerService } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-ret-reg-com-element',
  templateUrl: './ret-reg-com-element.component.html',
  styleUrls: ['./ret-reg-com-element.component.css']
})
export class RetRegComElementComponent implements OnInit {

  @Input() companyKey;

  key: any;
  comapany$: Observable<any>;
  registerWithCompany : boolean;
  retailerId: string;

  constructor(private companyServise: CompanyService, private retailerService: RetailerService,private  afAuth:  AngularFireAuth) { 

    this.retailerId=this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.key= this.companyKey.key;
    this.companyServise.getCompany(this.key);
    this.comapany$=this.companyServise.company;

    this.retailerService.isRegisteredWithCompany(this.key,this.retailerId);
     
    // console.log(this.registerWithCompany);
  }

}
