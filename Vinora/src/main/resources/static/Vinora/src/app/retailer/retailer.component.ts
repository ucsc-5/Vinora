import { Component, OnInit, OnDestroy } from '@angular/core';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import { ItemServiceService } from '../item/item-service.service';
import { Item } from '../item/item.model';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent {

  itemSelected: Item;


  opened = false;

  constructor(private itemService:ItemServiceService){

  }

  ngOnInit(){
    this.itemService.itemSelected.subscribe(
      (item:Item)=> {
        this.itemSelected = item;
      }
    )
  }
  log(state){
    console.log(state)
  }
 
}
  