import { Component, OnInit, Input } from '@angular/core';
import { CompanyEmailToken } from 'src/app/service/retailer.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ret-reg-company-element',
  templateUrl: './ret-reg-company-element.component.html',
  styleUrls: ['./ret-reg-company-element.component.css']
})
export class RetRegCompanyElementComponent implements OnInit {

  @Input() companyEmail : CompanyEmailToken;
  
  company: Observable<CompanyId[]>;

  constructor(private companyService:CompanyService) { }

  ngOnInit() {
    
    this.company = this.companyService.getCompanyByEmail(this.companyEmail.companyEmail);
    console.log(this.companyEmail.companyEmail);
    this.company.subscribe(x=>{
      console.log(x);
    })
  }

  onHold(){
    console.log("This is from the hold function");
  }

}
