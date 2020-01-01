import { Component, OnInit, Input } from '@angular/core';
import { ItemId, OrderItem, ItemService } from 'src/app/service/item.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DialogService } from 'src/app/service/dialog.service';
import { CartItem, CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-order-item-element',
  templateUrl: './order-item-element.component.html',
  styleUrls: ['./order-item-element.component.css']
})
export class OrderItemElementComponent implements OnInit {

  @Input() item:ItemId;

  companyId: string;
  retailerId: string;

  cartItem: CartItem;

  messageOfRootItem: any;


  constructor(private dialogService:DialogService,private afAuth: AngularFireAuth,private route:ActivatedRoute,private itemService:ItemService, private cartService:CartService) {
    this.retailerId =  this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
  }

  addToCart(form:NgForm){
    const value=form.value;
    const message=" Confirm! ";

    if(this.item.quantity<value.quantity){

    }else{
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){

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
            const itemId = this.item.id;
            const type = this.item.type;
            const total = quantity*this.item.unitPrice;
            const stmadded = false;
             
            this.messageOfRootItem = this.itemService.updateItem(this.item.id,{quantity: newQuantity}).then(
              x=>{
                const  cartItem: CartItem = {itemName,brand,quantity,unitPrice,itemImagePath,description,category,state,companyId,itemId,retailerId,type,total,stmadded};
                this.cartService.setItemsToCart(cartItem);
                return "done";
              }
            ).catch(
              error=>{error}
              )
              
          }
        
        })      
    }
  }
  
}
