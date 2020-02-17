import { Component, OnInit, Input } from '@angular/core';
import { CompanyId } from 'src/app/service/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reg-de-com-element',
  templateUrl: './reg-de-com-element.component.html',
  styleUrls: ['./reg-de-com-element.component.css']
})
export class RegDeComElementComponent implements OnInit {

  @Input() company:CompanyId;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  DeliveryCompanyReport(company:CompanyId){
    this.router.navigate(['../','registeredDeliveryCompany',company.id],{relativeTo: this.route});
  }

}
