import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-retailer-orders-for-stm',
  templateUrl: './retailer-orders-for-stm.component.html',
  styleUrls: ['./retailer-orders-for-stm.component.css']
})
export class RetailerOrdersForSTMComponent implements OnInit {

  @Input()retailer: RetailerId;
  

  constructor(private router:Router,private route:ActivatedRoute,private retailerService:RetailerService) { 

  }

  ngOnInit() {
    console.log(this.retailer.id+" this is the retailer Id");
  }

}
