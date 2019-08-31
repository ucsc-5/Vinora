import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';

@Component({
  selector: 'app-new-item-element-selected',
  templateUrl: './new-item-element-selected.component.html',
  styleUrls: ['./new-item-element-selected.component.css']
})
export class NewItemElementSelectedComponent implements OnInit {

  @Input()
  item : Item;
  @Input()
  i : number;
  
  constructor() {
    
   }

  ngOnInit() {
    
  }

}
