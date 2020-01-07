import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerService,RetailerId } from 'src/app/service/retailer.service';

@Component({
  selector: 'app-stock-manager-retailers',
  templateUrl: './stock-manager-retailers.component.html',
  styleUrls: ['./stock-manager-retailers.component.css']
})
export class StockManagerRetailersComponent implements OnInit {

  retailers: Observable<RetailerId[]>

  constructor(private retailerService:RetailerService) { }

  ngOnInit() {
    // this.retailerService.getRetailerByCompanyId
  }

}
