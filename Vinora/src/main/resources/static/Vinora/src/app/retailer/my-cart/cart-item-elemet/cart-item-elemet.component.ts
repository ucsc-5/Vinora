import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/service/item.service';

@Component({
  selector: 'app-cart-item-elemet',
  templateUrl: './cart-item-elemet.component.html',
  styleUrls: ['./cart-item-elemet.component.css']
})
export class CartItemElemetComponent implements OnInit {

  @Input() item:OrderItem

  constructor() { }

  ngOnInit() {
    
  }

}
