import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { ItemService } from 'src/app/service/item.service';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/service/order.model';


@Component({
  selector: 'app-order-item-element',
  templateUrl: './order-item-element.component.html',
  styleUrls: ['./order-item-element.component.css']
})
export class OrderItemElementComponent implements OnInit {

  @Input()  item :Item
  // @Input()  order:Order;

  @Output() itemCreated = new EventEmitter<Item>();

  orderedItem : Item;

  constructor(private db:AngularFireDatabase, private itemServise: ItemService,private orderService: OrderService) { 
  }


  ngOnInit() {
  }

  

  toCart(form: NgForm){
    const value = form.value;
    if(this.item.quantity < value.quantity){
      console.log('not enough items availabale')
    }else{
      const newQuantity =  (this.item.quantity)-(value.quantity);
      console.log(newQuantity);
  
      // this.itemServise.updateItem(this.item.key,{quantity : newQuantity});
      this.orderedItem = new Item(this.item.itemName,this.item.brand,this.item.description,value.quantity,this.item.unitPrice,this.item.state);
      console.log(this.orderedItem);
      this.itemCreated.emit(this.orderedItem);
    }


  }

 

}
