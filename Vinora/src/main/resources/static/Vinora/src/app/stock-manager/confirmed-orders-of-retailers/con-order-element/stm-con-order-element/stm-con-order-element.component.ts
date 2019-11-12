import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-stm-con-order-element',
  templateUrl: './stm-con-order-element.component.html',
  styleUrls: ['./stm-con-order-element.component.css']
})
export class StmConOrderElementComponent implements OnInit {

  @Input() item:CartItemId
  constructor() { }

  ngOnInit() {
  }

}
