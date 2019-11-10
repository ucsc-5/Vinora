import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { OrderService } from 'src/app/service/order.service';
import { OrderItem } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartService, CartItemId, CartItem } from 'src/app/service/cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompanyId } from 'src/app/service/company.service';
import { RetailerId } from 'src/app/service/retailer.service';



@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cartItems:Observable<CartItemId[]>;
  companyId:string;
  retailerId: string;
  public total=0;

  constructor(private orderService:OrderService,private router:Router,private cartService:CartService, private route:ActivatedRoute,private afAuth: AngularFireAuth,private afs: AngularFirestore) { 
    this.retailerId= this.afAuth.auth.currentUser.uid;
  }


  ngOnInit() {
    
    this.route.queryParams.subscribe(x=>{
      this.companyId=x.cI;  
    })
    
    this.cartItems= this.cartService.getCartItemsFromOrderByCompanyIdRetailerId(this.companyId,this.retailerId);
    this.cartItems.subscribe(x=>{
      console.log(x);
    })
  } 

  close(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  createOrder(cartItems:CartItemId[]){
      const id = this.afs.createId();
     this.orderService.addItems(cartItems,this.companyId,this.retailerId,id);
  }


}
