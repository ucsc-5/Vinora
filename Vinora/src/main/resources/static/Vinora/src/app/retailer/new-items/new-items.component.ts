import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';

@Component({
  selector: 'app-new-items',
  templateUrl: './new-items.component.html',
  styleUrls: ['./new-items.component.css'],
  providers: [ItemServiceService]
})
export class NewItemsComponent implements OnInit {

  selectedItem : Item;

  constructor(private itemService: ItemServiceService) {
    // console.log(this.selectedItem);
   }

  ngOnInit() {
    this.itemService.itemSelected.subscribe(
      (item: Item)=>{
        this.selectedItem= item;
      }
    )
  }

}
