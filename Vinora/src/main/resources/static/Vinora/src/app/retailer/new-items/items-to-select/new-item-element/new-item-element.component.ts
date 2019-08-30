import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Item } from 'src/app/item/item.model';

@Component({
  selector: 'app-new-item-element',
  templateUrl: './new-item-element.component.html',
  styleUrls: ['./new-item-element.component.css']
})
export class NewItemElementComponent implements OnInit {

  @Input()
  item = Item;
  @Input()
  i : number;
 
  @Output() itemAdded = new EventEmitter<void>();

  constructor() {
   }

  ngOnInit() {
  }

  onAdded(){
  
    this.itemAdded.emit();
  }

}
