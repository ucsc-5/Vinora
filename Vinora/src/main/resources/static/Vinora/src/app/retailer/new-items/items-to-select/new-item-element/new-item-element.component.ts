
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { Input, OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-new-item-element',
  templateUrl: './new-item-element.component.html',
  styleUrls: ['./new-item-element.component.css'],
  
})
export class NewItemElementComponent implements OnInit {

  @Input() item : Item;

 


  constructor(private itemService:ItemServiceService) {
   }

  ngOnInit() {
  }

  onAdded(){
     this.itemService.itemSelected.emit(this.item);
  }
}
