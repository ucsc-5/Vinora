import { Component, OnInit, Input } from '@angular/core';
import { ItemId } from 'src/app/service/item.service';

@Component({
  selector: 'app-order-item-element',
  templateUrl: './order-item-element.component.html',
  styleUrls: ['./order-item-element.component.css']
})
export class OrderItemElementComponent implements OnInit {

  @Input() item:ItemId;

  constructor() { }

  ngOnInit() {
    
  }

}
