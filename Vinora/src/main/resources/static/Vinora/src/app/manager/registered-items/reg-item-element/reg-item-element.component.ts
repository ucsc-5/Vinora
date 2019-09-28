import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/service/item.model';
import { ItemService } from 'src/app/service/item.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reg-item-element',
  templateUrl: './reg-item-element.component.html',
  styleUrls: ['./reg-item-element.component.css']
})
export class RegItemElementComponent implements OnInit {

  @Input() item:Item

  constructor(private itemService:ItemService) {
    
  }

  ngOnInit() {

  }

  onRemove(){

    // console.log(this.item.key);

    this.itemService.deleteItem(this.item.key);


  }

}
