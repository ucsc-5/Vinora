import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/service/item.model';

@Component({
  selector: 'app-cart-item-elemet',
  templateUrl: './cart-item-elemet.component.html',
  styleUrls: ['./cart-item-elemet.component.css']
})
export class CartItemElemetComponent implements OnInit {

  @Input() item:Item
  
  constructor() { }

  ngOnInit() {
  }

}
