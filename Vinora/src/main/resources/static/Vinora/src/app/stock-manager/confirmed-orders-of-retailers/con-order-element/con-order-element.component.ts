import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItemId,CartItem } from 'src/app/service/cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { StmConfirmOrderTempService } from 'src/app/service/stm-confirm-order-temp.service';
import { SalesRepresentativeId, SalesRepresentativeService } from 'src/app/service/sales-representative.service';

@Component({
  selector: 'app-con-order-element',
  templateUrl: './con-order-element.component.html',
  styleUrls: ['./con-order-element.component.css']
})
export class ConOrderElementComponent implements OnInit {

  @Input() order: OrderId
  retailers: Observable<RetailerId[]>
  items: Observable<CartItemId[]>
  setItems: Observable<CartItemId[]>
  salesRepresentatives: Observable<SalesRepresentativeId[]>
  
  orderId:string
  orderTotal:number
  tempOrderTotal:number
  allowRefAssign= false;
  selectedRep: string;



  constructor(private salesRepService:SalesRepresentativeService,private orderService:OrderService,private retailerServie:RetailerService,private afs: AngularFirestore,private tempItems:StmConfirmOrderTempService) { }

  ngOnInit() {
    this.orderId=this.order.id;
    this.orderTotal= this.order.total;
    this.retailers=this.retailerServie.getRetailerById(this.order.retailerId);
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    this.setItems =this.tempItems.getItemsByOrderId(this.order.id); 

    this.tempOrderTotal=this.orderTotal=100;

    if(this.orderTotal==this.tempOrderTotal){
      this.allowRefAssign= true;
    }

    this.salesRepresentatives =  this.salesRepService.getSalesRepByCompanyId(this.order.companyId);
    this.salesRepresentatives.forEach(x=>{
      console.log(x);
      
    })
  }

  


}
