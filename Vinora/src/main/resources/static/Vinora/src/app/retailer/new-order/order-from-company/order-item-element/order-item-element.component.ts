import { Component, OnInit, Input } from '@angular/core';
import { ItemId, OrderItem, ItemService } from 'src/app/service/item.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-item-element',
  templateUrl: './order-item-element.component.html',
  styleUrls: ['./order-item-element.component.css']
})
export class OrderItemElementComponent implements OnInit {

  @Input() item:ItemId;

  companyId: string;
  retailerId: string;

  orderItem: OrderItem;

  messageOfRootItem: any;
  messageOfOrderItem: any;

  constructor(private route:ActivatedRoute,private itemService:ItemService, private orderService:OrderService) { }

  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
      this.retailerId = param['retailerId'];
    });
  }

  addToCart(form:NgForm){

    const value=form.value;



    if(this.item.quantity<value.quantity){

    }else{

      const newQuantity= this.item.quantity-value.quantity;
      const quantity=value.quantity;

      const itemName = this.item.itemName;
      const brand = this.item.brand;
      const unitPrice = this.item.unitPrice;
      const itemImagePath = this.item.itemImagePath;
      const description = this.item.description;
      const category = this.item.category;
      const state = this.item.state;
      const companyId = this.item.companyId;

      const retailerId = this.retailerId;
      const rootId = this.item.id;
      const stockManagerId = "";
      const salesRefId = "";
       
      this.messageOfRootItem = this.itemService.updateItem(this.item.id,{quantity: newQuantity}).then(
        x=>{
          return "done";
        }
      ).catch(
        error=>{error}
        )
        console.log(quantity+" the new Item");
        const  orderItem: OrderItem = {itemName,brand,quantity,unitPrice,itemImagePath,description,category,state,companyId,rootId,retailerId,stockManagerId,salesRefId};
        this.orderService.addToItemsArray(orderItem);
    }

       
    console.log(this.messageOfRootItem+" this is from the item");
    // console.log(this.messageOfOrderItem+" this is from the Order");
  }
  
}
