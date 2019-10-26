import { Component, OnInit, Input } from '@angular/core';
import { SalesRepresentativeId } from 'src/app/service/company.service';

@Component({
  selector: 'app-display-sales-representative',
  templateUrl: './display-sales-representative.component.html',
  styleUrls: ['./display-sales-representative.component.css']
})
export class DisplaySalesRepresentativeComponent implements OnInit {
  @Input() salesrepresentative:SalesRepresentativeId
  constructor() { }

  ngOnInit() {
  }

}
