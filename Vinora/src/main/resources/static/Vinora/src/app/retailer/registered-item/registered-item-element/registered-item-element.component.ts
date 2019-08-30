import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';

@Component({
  selector: 'app-registered-item-element',
  templateUrl: './registered-item-element.component.html',
  styleUrls: ['./registered-item-element.component.css']
})
export class RegisteredItemElementComponent implements OnInit {

  @Input()
  item =Item;
  @Input()
  i ; number;
  
  constructor() { }

  ngOnInit() {
  }

}
