import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { RetailerItemService } from '../../retailer-items/retailer-item.service';

@Component({
  selector: 'app-items-selected',
  templateUrl: './items-selected.component.html',
  styleUrls: ['./items-selected.component.css']
  
})
export class ItemsSelectedComponent implements OnInit {

  @Input() item : Item;

  items: Item[]; 
     
  constructor(private itemService:RetailerItemService) {}

  ngOnInit() {
    this.items=this.itemService.getRetailerItemsSelected();
    console.log(this.items);
  }

}
