import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-report-confirm-order-item',
  templateUrl: './report-confirm-order-item.component.html',
  styleUrls: ['./report-confirm-order-item.component.css']
})
export class ReportConfirmOrderItemComponent implements OnInit {
  @Input() item:CartItemId;
  constructor() { }

  ngOnInit() {

    console.log(this.item);
  }

}
