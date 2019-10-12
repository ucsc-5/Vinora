import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/service/item.model';

@Component({
  selector: 'app-new-order-item-elemet',
  templateUrl: './new-order-item-elemet.component.html',
  styleUrls: ['./new-order-item-elemet.component.css']
})
export class NewOrderItemElemetComponent implements OnInit {

  @Input() item:Item

  constructor() { }

  ngOnInit() {
  }

}
