import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';

@Component({
  selector: 'app-items-selected',
  templateUrl: './items-selected.component.html',
  styleUrls: ['./items-selected.component.css'],
  providers: [ItemServiceService]
})
export class ItemsSelectedComponent implements OnInit {

  @Input() item : Item;

  items: Item[]; 
  // = [ new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new')]
                   
  constructor(private itemService:ItemServiceService) {
    
  }

  ngOnInit() {
    this.items=this.itemService.getItem();
    // this.item = new Item(this.item.id,this.item.itmeName,this.item.brand,this.item.description,this.item.imagePath,this.item.brandImagePath,this.item.quantity,this.item.unitPrice,this.item.state);
    // this.items.push(this.item);
  }

}
