import { Component, OnInit, Input } from '@angular/core';
import { CompanyEmailToken } from 'src/app/service/retailer.service';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ret-reg-company-element',
  templateUrl: './ret-reg-company-element.component.html',
  styleUrls: ['./ret-reg-company-element.component.css']
})
export class RetRegCompanyElementComponent implements OnInit {

  @Input() company : CompanyId;
  


  constructor(private companyService:CompanyService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {

  }

  onHold(){
    console.log("This is from the hold function");
  }

  OrderNow(company:CompanyId){
    this.router.navigate(['../','companies',company.id],{relativeTo: this.route})
  }

}
