import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/service/item.model';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-new-order-item-elemet',
  templateUrl: './new-order-item-elemet.component.html',
  styleUrls: ['./new-order-item-elemet.component.css']
})
export class NewOrderItemElemetComponent implements OnInit {

  @Input() item:Item

  orderedItem : Item;

  constructor(private itemServise: ItemService) { }

  ngOnInit() {

    console.log("form the item elements");

  }

  toCart(form: NgForm){
    const value = form.value;
    if(this.item.quantity < value.quantity){
      console.log('not enough items availabale')
    }else{
      const newQuantity =  (this.item.quantity)-(value.quantity);
      console.log(newQuantity);
      this.itemServise.updateItem(this.item.key,{quantity : newQuantity});
      this.orderedItem = new Item(this.item.itemName,this.item.brand,this.item.description,value.quantity,this.item.unitPrice,this.item.state);
      console.log(this.orderedItem);
      // this.itemCreated.emit(this.orderedItem);
    }


  }

}
