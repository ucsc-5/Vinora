import { Component, OnInit, OnDestroy } from '@angular/core';

import {ChangeDetectorRef} from '@angular/core';
import { RetailerService } from '../service/retailer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
;



@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css'],
})
export class RetailerComponent {

  
  retailerId: string;

  opened = true;

  constructor(private retailerService:RetailerService, private route:ActivatedRoute){

  
  }

  ngOnInit(){
    
    this.route.params.subscribe((param:Params)=>{
      this.retailerId = param['retailerId'];})

    // this.retailerService.getRetailer(this.retailerId);
 
  }
 
}
  