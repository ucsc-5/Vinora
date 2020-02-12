import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerId } from 'src/app/service/retailer.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-company-not-registered-retailers',
  templateUrl: './company-not-registered-retailers.component.html',
  styleUrls: ['./company-not-registered-retailers.component.css']
})
export class CompanyNotRegisteredRetailersComponent implements OnInit {

  notRegRetId:string;
  notRegisterRetailers: Observable<RetailerId[]>
  constructor(private route:ActivatedRoute, private retailerservice: retailerservice) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.notRegRetId=param['notRegRetId'];})

      this.
  }

}
