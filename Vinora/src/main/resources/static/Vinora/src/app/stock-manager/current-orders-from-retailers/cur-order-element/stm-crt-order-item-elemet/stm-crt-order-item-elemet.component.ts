import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-stm-crt-order-item-elemet',
  templateUrl: './stm-crt-order-item-elemet.component.html',
  styleUrls: ['./stm-crt-order-item-elemet.component.css']
})
export class StmCrtOrderItemElemetComponent implements OnInit {

  @Input() item:CartItemId
  constructor() { }

  ngOnInit() {
  }

}
