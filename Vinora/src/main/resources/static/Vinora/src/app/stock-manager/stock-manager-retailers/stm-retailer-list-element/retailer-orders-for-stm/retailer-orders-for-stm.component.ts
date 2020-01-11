import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-retailer-orders-for-stm',
  templateUrl: './retailer-orders-for-stm.component.html',
  styleUrls: ['./retailer-orders-for-stm.component.css']
})
export class RetailerOrdersForSTMComponent implements OnInit {

  orderType: string;
  

  constructor(private router:Router,private route:ActivatedRoute,private retailerService:RetailerService) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.orderType = param['orderType'];})
  }

}
