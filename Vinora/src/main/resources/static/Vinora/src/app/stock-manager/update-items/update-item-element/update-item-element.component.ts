import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-update-item-element',
  templateUrl: './update-item-element.component.html',
  styleUrls: ['./update-item-element.component.css']
})
export class UpdateItemElementComponent implements OnInit {

  @Input() item:Item

  constructor(private itemServise:ItemService) { }

  ngOnInit() {
  }

  updateQuantity(form:NgForm) {
    const value=form.value;
    console.log(value.quantity);
    console.log(this.item.key);
    this.itemServise.updateItem(this.item.key, {quantity: value.quantity})
      .catch(err => console.log(err+"jkdcjdscjsdbc"));
  }




}
