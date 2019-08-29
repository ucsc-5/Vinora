import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public items:[] = [];


  constructor(private itemService: ItemServiceService) { }

  ngOnInit() {
    this.itemService.getItem().subscribe(
      (items: Item[]) => console.log(items)
    );

    // console.log(this.items);
  }

}
