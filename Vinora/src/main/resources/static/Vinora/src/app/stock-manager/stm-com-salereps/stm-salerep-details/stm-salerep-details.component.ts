import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SalesRepresentativeId, SalesRepresentativeService,SalesRepresentative } from 'src/app/service/sales-representative.service';

@Component({
  selector: 'app-stm-salerep-details',
  templateUrl: './stm-salerep-details.component.html',
  styleUrls: ['./stm-salerep-details.component.css']
})
export class StmSalerepDetailsComponent implements OnInit {

  saleRepId: string;
  saleRepresentatives: Observable<SalesRepresentativeId[]>
  constructor(private route: ActivatedRoute,private saleRepservice: SalesRepresentativeService) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.saleRepId = param['saleRepId'];})

      this.saleRepresentatives=this.saleRepservice.getSalesRepByRepId(this.saleRepId);
  }

}
