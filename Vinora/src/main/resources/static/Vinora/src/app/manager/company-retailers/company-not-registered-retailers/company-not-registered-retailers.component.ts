import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-company-not-registered-retailers',
  templateUrl: './company-not-registered-retailers.component.html',
  styleUrls: ['./company-not-registered-retailers.component.css']
})
export class CompanyNotRegisteredRetailersComponent implements OnInit {

  notRegRetId:string;
  notRegisterRetailers: Observable<RetailerId[]>
  constructor (private route:ActivatedRoute, private retailerservice: RetailerService) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.notRegRetId=param['notRegRetId'];})

      this.notRegisterRetailers = this.retailerservice.getRetailerById(this.notRegRetId)

      // this.saleRepresentatives=this.saleRepservice.getSalesRepByRepId(this.saleRepId);

  }

}
