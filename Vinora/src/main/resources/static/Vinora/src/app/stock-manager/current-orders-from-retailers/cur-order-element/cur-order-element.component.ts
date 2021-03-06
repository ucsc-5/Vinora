import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService, Order } from 'src/app/service/order.service';
import { StockManagerId } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItem, CartItemId, CartService } from 'src/app/service/cart.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-cur-order-element',
  templateUrl: './cur-order-element.component.html',
  styleUrls: ['./cur-order-element.component.css']
})
export class CurOrderElementComponent implements OnInit {

  @Input() order: OrderId
  companyId:string;
  currentOrders: Observable<OrderId[]>
  retailers: Observable<RetailerId[]>
  items: Observable<CartItemId[]>
  orderId
  stockManagerId:string;
  newQuantity: number;

  constructor(private dialogService:DialogService,private afs:AngularFirestore,private orderService:OrderService,private afAuth: AngularFireAuth,private retailerServie:RetailerService,private cartservice:CartService) { }

  ngOnInit() {
    this.retailers=this.retailerServie.getRetailerById(this.order.retailerId);
    this.orderId=this.order.id;
    this.stockManagerId=this.afAuth.auth.currentUser.uid;
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    
    
  }

  confirmOrder(){

    const message="Confirm !";
  
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.orderService.updateState(this.order.id,0,this.stockManagerId);
          this.order.stockManagerId=this.stockManagerId;
          this.items=this.orderService.getItemsByOrderId(this.order.id);
          this.order.tempTotal=0;
          this.afs.collection('retailers').doc(this.order.retailerId).collection('purchaseOrders').doc(this.order.id).set({state:0});
          this.afs.collection('retailers').doc(this.order.retailerId).collection('confirmedOrders').doc(this.order.id).set(this.order);
          this.afs.collection('companies').doc(this.order.companyId).collection('purchaseOrders').doc(this.order.id).set({state:0});
          this.afs.collection('companies').doc(this.order.companyId).collection('confirmedOrders').doc(this.order.id).set(this.order);
        
          console.log(this.items);
        this.items.forEach(x=>{

          
        x.forEach(x2=>{
          console.log(x2.id);
           this.orderService.setStmAddedFeild(this.orderId,x2.id); 
            this.afs.collection('retailers').doc(this.order.retailerId).collection('items').doc(x2.itemId).set(x2);
            this.cartservice.addQuantitytItem(x2.itemCount,x2,this.order.retailerId,this.order.companyId);
           console.log(x2.itemName);
          })
        })
      }

    })

  }
  
}
