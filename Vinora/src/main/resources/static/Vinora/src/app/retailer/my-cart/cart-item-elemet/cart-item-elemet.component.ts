import { Component, OnInit, Input } from '@angular/core';
import { OrderItem, ItemId } from 'src/app/service/item.service';
import { CartItemId, CartService, CartItem } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cart-item-elemet',
  templateUrl: './cart-item-elemet.component.html',
  styleUrls: ['./cart-item-elemet.component.css']
})
export class CartItemElemetComponent implements OnInit {

  @Input() item:CartItemId;
  availableQuantity 
  quantity

  updateForm: FormGroup

  constructor(private afs: AngularFirestore,private dialogService:DialogService,private cartService:CartService) { 

  }

  ngOnInit() {
    this.afs.collection('items').doc(`${this.item.itemId}`).get().subscribe(x=>{
      this.availableQuantity=x.data().quantity
   })

   this.updateForm = new FormGroup({
    'quantity': new FormControl(null,[Validators.required,Validators.min(0)])
  });
  
}


  onRemove(item:CartItemId){
    const message="Are you sure removing this item !";
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.cartService.retailerRemoveItemFromCart(item.itemId,item);
        }})
   
  }

  
  addQuantity(item:CartItemId,quantity:number){
    const myQ = +quantity;
    const message="Confirm Updating!!"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.cartService.addQuantityCartItem(myQ,item);
        }})
    
  }

  reduceQuantity(item:CartItemId,quantity:number){
    const myQ = +quantity;
    const message="Confirm !!"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.cartService.redeuseQuantityCartItem(myQ,item);
        }})
  }

  refresh(){
    this.updateForm.reset();
  }

  itemDetails(item:CartItemId){
    this.dialogService.openItemDetailsDialog(item).afterClosed();
  }
  

}
