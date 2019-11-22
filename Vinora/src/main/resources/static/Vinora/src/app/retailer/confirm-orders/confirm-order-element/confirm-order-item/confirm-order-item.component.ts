import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-confirm-order-item',
  templateUrl: './confirm-order-item.component.html',
  styleUrls: ['./confirm-order-item.component.css']
})
export class ConfirmOrderItemComponent implements OnInit {

  @Input() item:CartItemId;
  constructor() { }

  ngOnInit() {
    console.log(this.item);
  }

}
