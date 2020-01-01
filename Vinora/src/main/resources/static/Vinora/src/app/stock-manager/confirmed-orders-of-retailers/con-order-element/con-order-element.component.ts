import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItemId,CartItem } from 'src/app/service/cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { SalesRepresentativeId, SalesRepresentativeService } from 'src/app/service/sales-representative.service';
import { FormGroup } from '@angular/forms';

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
  selectRep: FormGroup;



  constructor(private salesRepService:SalesRepresentativeService,private orderService:OrderService,private retailerServie:RetailerService,private afs: AngularFirestore) { }

  ngOnInit() {
    this.orderId=this.order.id;
    this.retailers=this.retailerServie.getRetailerById(this.order.retailerId);
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    
    if(this.order.total==this.order.tempTotal){
      this.allowRefAssign= true;
    }

    this.salesRepresentatives =  this.salesRepService.getSalesRepByCompanyId(this.order.companyId);
    this.salesRepresentatives.forEach(x=>{
      console.log(x);
    })

    // this.selectRep = new FormGroup({

    //   'companyName': new FormControl(null,[Validators.required]),})

  }

  selected(event){
    console.log(event);
    
  }
  
  assign(){
    console.log(this.selectedRep);
  }


}
