import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-retailer-dashboard-for-stm',
  templateUrl: './retailer-dashboard-for-stm.component.html',
  styleUrls: ['./retailer-dashboard-for-stm.component.css']
})
export class RetailerDashboardForSTMComponent implements OnInit {

  retailerId: string;
  retailer: Observable<RetailerId[]>;
  latitude = 6.902196;
  longitude = 79.861133;

  constructor(private router:Router,private route:ActivatedRoute,private retailerService:RetailerService) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.retailerId = param['retailerId'];})
    this.retailer = this.retailerService.getRetailerById(this.retailerId);
  }

}
