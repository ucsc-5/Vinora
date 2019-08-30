import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';

@Component({
  selector: 'app-new-item-element',
  templateUrl: './new-item-element.component.html',
  styleUrls: ['./new-item-element.component.css'],
  providers: [ItemServiceService]
})
export class NewItemElementComponent implements OnInit {

  @Input() item = Item;
  @Input()
  i : number;
 


  constructor(private itemService:ItemServiceService) {
   }

  ngOnInit() {
  }

  onAdded(){
     this.itemService.itemSelected.emit(this.item);
  }

}
