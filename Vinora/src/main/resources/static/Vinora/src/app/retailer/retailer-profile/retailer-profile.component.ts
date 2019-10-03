import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerService } from 'src/app/service/retailer.service';

@Component({
  selector: 'app-retailer-profile',
  templateUrl: './retailer-profile.component.html',
  styleUrls: ['./retailer-profile.component.css']
})
export class RetailerProfileComponent implements OnInit {

  retailer: Observable<any>

  constructor(private retailerService:RetailerService) {
    
   }

  ngOnInit() {
    this.retailer = this.retailerService.retailer;
  }

}
