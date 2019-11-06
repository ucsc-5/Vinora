import { Component, OnInit, Input } from '@angular/core';
import { ItemId, OrderItem, ItemService } from 'src/app/service/item.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-order-item-element',
  templateUrl: './order-item-element.component.html',
  styleUrls: ['./order-item-element.component.css']
})
export class OrderItemElementComponent implements OnInit {

  @Input() item:ItemId;

  companyId: string;
  retailerId: string;

  orderItem: OrderItem;

  messageOfRootItem: any;
  messageOfOrderItem: any;

  constructor(private dialogService:DialogService,private afAuth: AngularFireAuth,private route:ActivatedRoute,private itemService:ItemService, private orderService:OrderService) {
    this.retailerId =  this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });

    console.log(this.companyId+" com"+this.retailerId+" ret Id");
  }

  addToCart(form:NgForm){

    const value=form.value;
    const message=" Confirm! ";



    if(this.item.quantity<value.quantity){

    }else{
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){

            const newQuantity= this.item.quantity-value.quantity;
            const quantity=value.quantity;
      
            const itemName = this.item.itemName;
            const brand = this.item.brand;
            const unitPrice = this.item.unitPrice;
            const itemImagePath = this.item.itemImagePath;
            const description = this.item.description;
            const category = this.item.category;
            const state = this.item.state;
            const companyId = this.item.companyId;
      
            const retailerId = this.retailerId;
            const rootId = this.item.id;
            const stockManagerId = "";
            const salesRefId = "";
            const type = this.item.type;
             
            this.messageOfRootItem = this.itemService.updateItem(this.item.id,{quantity: newQuantity}).then(
              x=>{
                const  orderItem: OrderItem = {itemName,brand,quantity,unitPrice,itemImagePath,description,category,state,companyId,rootId,retailerId,stockManagerId,salesRefId,type};
                this.orderService.addItems(orderItem);
                return "done";
              }
            ).catch(
              error=>{error}
              )
              
          }
        
        })

   
        
       
    }
  }
  
}
