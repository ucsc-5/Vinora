import { Component, OnInit } from '@angular/core';
import { OrderItem, ItemService, Item } from 'src/app/service/item.service';
import { OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import { CartService, CartItemId } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';



@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.css']
})
export class OrderSummeryComponent implements OnInit {
  cartItems:Observable<CartItemId[]>;
  companyId:string;
  liveItemQuantity;
  newQuantity;
  // mailUrl = "https://us-central1-vinora-dc8a2.cloudfunctions.net/retailerRemoveItems";
  // myUrl="https://us-central1-vinora-dc8a2.cloudfunctions.net/getCartItems";


  constructor(private dialogService:DialogService,private fns: AngularFireFunctions,private itemService:ItemService ,private cartService:CartService, private route:ActivatedRoute,private afs: AngularFirestore) { }


  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
    this.cartItems= this.cartService.getCartItemsFromOrderByCompanyId(this.companyId);
  } 

  async onRemove(item:CartItemId){
    const message="Confirm !"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.cartService.retailerRemoveItemFromCart(item.itemId,item)
        }})
   
  }

 

}
