import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerService,RetailerId } from 'src/app/service/retailer.service';
import { CompanyService } from 'src/app/service/company.service';


@Component({
  selector: 'app-stock-manager-retailers',
  templateUrl: './stock-manager-retailers.component.html',
  styleUrls: ['./stock-manager-retailers.component.css']
})
export class StockManagerRetailersComponent implements OnInit {

  retailers: Observable<RetailerId[]>

  constructor(private companyService :CompanyService) { }

  ngOnInit() {
    // this.retailers = this.companyService.getRegisteredRetailers()
  }

}
