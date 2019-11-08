import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/service/item.service';
import { CartItemId, CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-cart-item-elemet',
  templateUrl: './cart-item-elemet.component.html',
  styleUrls: ['./cart-item-elemet.component.css']
})
export class CartItemElemetComponent implements OnInit {

  @Input() item:OrderItem

  constructor(private dialogService:DialogService,private cartService:CartService) { }

  ngOnInit() {
    
  }

  onRemove(item:CartItemId){
    const message=" Confirm! ";
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.cartService.retailerRemoveItemFromCart(item.itemId,item);
        }})
   
  }

}
