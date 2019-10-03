import { Component, OnInit } from '@angular/core';
import { RetailerService } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-retailer-dashboard',
  templateUrl: './retailer-dashboard.component.html',
  styleUrls: ['./retailer-dashboard.component.css']
})
export class RetailerDashboardComponent implements OnInit {

  retailer: Observable<any>;

  constructor(private retailerService:RetailerService) { 
    
  }

  ngOnInit() {
    this.retailer= this.retailerService.retailer;
  }

}
