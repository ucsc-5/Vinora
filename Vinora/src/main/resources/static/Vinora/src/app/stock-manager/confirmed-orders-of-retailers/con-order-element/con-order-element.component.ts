import { Component, OnInit, Input } from '@angular/core';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { CartItemId,CartItem } from 'src/app/service/cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';

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
  formValid= false;
  selectedRepId: string;
  selectRep: FormGroup;



  constructor(private dialogService:DialogService,private salesRepService:SalesRepresentativeService,private orderService:OrderService,private retailerServie:RetailerService,private afs: AngularFirestore) { }

  ngOnInit() {
    this.orderId=this.order.id;
    this.retailers=this.retailerServie.getRetailerById(this.order.retailerId);
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    this.salesRepresentatives =  this.salesRepService.getSalesRepByCompanyId(this.order.companyId);

    this.selectRep = new FormGroup({
      'saleRep': new FormControl(null,[Validators.required])
    })

    this.selectRep.statusChanges.subscribe(state=>{
      console.log(state);
      
      if((state=="VALID")&&((this.order.total==this.order.tempTotal))){
        this.allowRefAssign= true;
        }
            })
  }

  selected(event){
    console.log(event);
    
  }
  

  assign(){

    const message = "Confirm Assigning";
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.orderService.setSaleRep(this.selectedRepId,this.orderId)
        }})

  }

}
