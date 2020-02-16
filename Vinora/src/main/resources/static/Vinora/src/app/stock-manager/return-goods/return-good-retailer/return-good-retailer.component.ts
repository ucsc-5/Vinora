import { Component, OnInit, Input } from '@angular/core';
import { RetailerService,RetailerId,RetailerEmailTokenId,RetailerEmailToken } from 'src/app/service/retailer.service';
import { Observable, Timestamp } from 'rxjs';
// import { ReturnGoodsId } from 
import { ReturnGoodsService,ReturnGoodsId } from 'src/app/service/return-goods.service';

@Component({
  selector: 'app-return-good-retailer',
  templateUrl: './return-good-retailer.component.html',
  styleUrls: ['./return-good-retailer.component.css']
})
export class ReturnGoodRetailerComponent implements OnInit {
  @Input() good: ReturnGoodsId;
  retailer:Observable<RetailerId[]>
  constructor(private retailerService:RetailerService) { 
    
    
  }

  ngOnInit() {
    console.log(this.good.retailerId);
    this.retailer=this.retailerService.getRetailerById(this.good.retailerId);
  }

}
