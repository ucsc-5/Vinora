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
  nowAssign= false;
  formValid= false;
  selectedRepId: string;
  selectRep: FormGroup;
  precentage



  constructor(private dialogService:DialogService,private salesRepService:SalesRepresentativeService,private orderService:OrderService,private retailerServie:RetailerService,private afs: AngularFirestore) { }

  ngOnInit() {
    this.orderId=this.order.id;
    this.precentage= (this.order.tempTotal/this.order.total)*100;

    this.retailers=this.retailerServie.getRetailerById(this.order.retailerId);
    this.items=this.orderService.getItemsByOrderId(this.order.id);
    
    console.log("Total :"+this.order.total);
    console.log("Temp total "+this.order.tempTotal);
    console.log("Precentage "+this.precentage);
    
    
    
    this.salesRepresentatives =  this.salesRepService.getSalesRepByCompanyId(this.order.companyId);

    this.selectRep = new FormGroup({
      'saleRep': new FormControl(null,[Validators.required])
    })

    this.selectRep.statusChanges.subscribe(state=>{
      console.log(state);
      
                if(this.order.total==this.order.tempTotal){
                  console.log("total same");
                  this.nowAssign=true
                  
                  if(state=="VALID"){
                    this.allowRefAssign= true;
                    console.log("form valid here");
                    
                  }else{
                    this.allowRefAssign= false;
                    console.log("form invalid here");
                    
                  }
                }else{
                  this.allowRefAssign= false;
                  this.nowAssign= false;
                  console.log("total not same");
                  
                }      
            })
  }

  selected(event){
    console.log(event);
    
  }
  

  assign(){
    const message = "Confirm Assigning";

    this.afs.collection('salesRepresentatives').doc(this.selectedRepId).collection('assignedOrders').doc(this.order.id).set(this.order);

    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.order.saleRepId=this.selectedRepId;
          this.afs.collection('orders').doc(this.orderId).update({saleRepId:this.selectedRepId});
          this.afs.collection('retailers').doc(this.order.retailerId).collection('purchaseOrders').doc(this.order.id).set({state:0});
          this.afs.collection('companies').doc(this.order.companyId).collection('purchaseOrders').doc(this.order.id).set({state:0});
          this.afs.collection('retailers').doc(this.order.retailerId).collection('assignedOrders').doc(this.order.id).set(this.order);
          this.afs.collection('companies').doc(this.order.companyId).collection('assignedOrders').doc(this.order.id).set(this.order);
        }})
  }
}
