import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { RetailerService } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';


interface MyKey{
  key: string
}


@Component({
  selector: 'app-ret-reg-com-element',
  templateUrl: './ret-reg-com-element.component.html',
  styleUrls: ['./ret-reg-com-element.component.css']
})
export class RetRegComElementComponent implements OnInit {

  @Input() companyKey;

  myKey: Observable<MyKey>
  key: any;
  comapany$: Observable<any>;
  retailerId: string;
  isRegistered$:Observable<any>;

  constructor(private companyServise: CompanyService, private retailerService: RetailerService,private  afAuth:  AngularFireAuth) { 

    this.retailerId=this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.key= this.companyKey.key;
    this.companyServise.getCompany(this.key);
    this.comapany$=this.companyServise.company;
    // this.isRegistered$=this.retailerService.isRegisteredWithCompany(this.key,this.retailerId);
    // this.isRegistered$ = this.retailerService.registeredCompanies$;

    this.isRegistered$.subscribe(res=>{
      res.forEach(x=>{
        this.myKey=x.key;
        console.log(this.myKey+" the keys");
      })
    })

    console.log(this.myKey+" fromthe out sidwedwed")
  }

}
