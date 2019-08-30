import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item/item.model';

@Component({
  selector: 'app-new-items',
  templateUrl: './new-items.component.html',
  styleUrls: ['./new-items.component.css']
})
export class NewItemsComponent implements OnInit {

  selectedItem : Item;

  constructor() {
    console.log(this.selectedItem);
   }

  ngOnInit() {
  }

}
