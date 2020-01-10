import { Component, OnInit,Input } from '@angular/core';
import { RetailerService,RetailerId,RetailerEmailTokenId } from 'src/app/service/retailer.service';

@Component({
  selector: 'app-stm-retailer-list-element',
  templateUrl: './stm-retailer-list-element.component.html',
  styleUrls: ['./stm-retailer-list-element.component.css']
})
export class StmRetailerListElementComponent implements OnInit {
  @Input()  retailersTaken: RetailerEmailTokenId
  constructor() { }

  ngOnInit() {
  }

}
