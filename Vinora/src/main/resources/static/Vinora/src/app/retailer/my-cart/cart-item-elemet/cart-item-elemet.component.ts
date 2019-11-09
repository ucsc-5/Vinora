import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/service/item.service';
import { CartItemId, CartService, CartItem } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cart-item-elemet',
  templateUrl: './cart-item-elemet.component.html',
  styleUrls: ['./cart-item-elemet.component.css']
})
export class CartItemElemetComponent implements OnInit {

  @Input() item:CartItem;
  availableQuantity 
  quantity

  constructor(private afs: AngularFirestore,private dialogService:DialogService,private cartService:CartService) { 

  }

  ngOnInit() {
    this.afs.collection('items').doc(`${this.item.itemId}`).get().subscribe(x=>{
      this.availableQuantity=x.data().quantity
  })
  
    }


  onRemove(item:CartItemId){
    const message=" Confirm! ";
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.cartService.retailerRemoveItemFromCart(item.itemId,item);
        }})
   
  }

  
  updateCartItem(item:CartItemId,quantity:number){
    const myQ = +quantity;
    this.cartService.updateCartItem(myQ,item);
  }

}
