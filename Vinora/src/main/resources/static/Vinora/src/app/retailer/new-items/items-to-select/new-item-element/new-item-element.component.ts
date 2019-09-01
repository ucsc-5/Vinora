
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { Input, OnInit, Component } from '@angular/core';
import { RetailerItemService } from 'src/app/retailer/retailer-items/retailer-item.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-new-item-element',
  templateUrl: './new-item-element.component.html',
  styleUrls: ['./new-item-element.component.css'],
  
})
export class NewItemElementComponent implements OnInit {

  @Input() item : Item;


  constructor(private itemService:RetailerItemService) {
    
  }

  ngOnInit() {
  }

  onAdded(){
    this.itemService.itemSelected.emit(this.item);
    this.itemService.addSelectedItems(this.item);
  }

}
