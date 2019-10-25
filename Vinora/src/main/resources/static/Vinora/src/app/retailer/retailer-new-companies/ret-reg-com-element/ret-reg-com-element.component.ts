import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { RetailerService } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-ret-reg-com-element',
  templateUrl: './ret-reg-com-element.component.html',
  styleUrls: ['./ret-reg-com-element.component.css']
})
export class RetRegComElementComponent implements OnInit {

  @Input() company:CompanyId;

  retailerEmail: string;
  retailerUid: string;
  companyEmail: string;
  comapanyUid: string;
  


 
  constructor(private companyServise: CompanyService, private retailerService: RetailerService,private  afAuth:  AngularFireAuth) { 
    this.retailerEmail= this.afAuth.auth.currentUser.email;
    this.retailerUid = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {

  }

  onRegister(){
    this.retailerService.registerRetailer(this.retailerEmail,this.retailerUid,this.company.id,this.company.email)
  }

}
