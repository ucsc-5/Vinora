import { Component, OnInit,Input } from '@angular/core';
import { Router,ActivatedRoute,Params,RouterEvent} from '@angular/router';
import { ItemService, Item, ItemId } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { NgForm,FormGroup, FormControl, Validators} from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';

@Component({
  selector: 'app-stm-update-item-quantity',
  templateUrl: './stm-update-item-quantity.component.html',
  styleUrls: ['./stm-update-item-quantity.component.css']
})
export class StmUpdateItemQuantityComponent implements OnInit {

  @Input() scalerRead: number;
  item:Item
  
  itemId:string;

  updateQuantityForm:FormGroup;
  updateQuantityFormValid=true;
  message: any;
  manual:boolean = true;
  byScaler: boolean = false;
  method = ' manual'
  constructor(private route:ActivatedRoute,private itemService:ItemService,private dialogService:DialogService) { 
    console.log(this.scalerRead+" this i womfjghascxkgasvxhvas");
  }

  ngOnInit() {
    this.updateQuantityForm = new FormGroup({
      'quantity': new FormControl(null,[Validators.min(0)])
    })

    this.route.params.subscribe((param:Params)=>{
      this.itemId = param['itemId'];})

      this.itemService.getStockItem(this.itemId).get().subscribe(
        x=>{        
          const brand = x.data().brand;
          const category = x.data().category;
          const companyId = x.data().companyId;
          const description =x.data().description;
          const itemImagePath=x.data().itemImagePath;
          const itemName=x.data().itemName;
          const quantity=x.data().quantity;
          const reOrderingLevel=x.data().reOrderingLevel;
          const state=x.data().state;
          const type=x.data().type;
          const unitPrice=x.data().unitPrice;
          const unitValue=x.data().unitValue;
          this.item = {brand,category,companyId,description,itemImagePath,itemName,quantity,reOrderingLevel,state,type,unitPrice,unitValue}
        }
      )

  

      this.updateQuantityForm.statusChanges.subscribe(state=>{
        console.log(state);
        if(state=="VALID"){
          this.updateQuantityFormValid=true;
        }else{
          this.updateQuantityFormValid=false;
        }
      })
    
  }

  updateQuantity() {
    const quantity = this.updateQuantityForm.value.quantity;
    console.log(quantity);
    
    const newQuantity= this.item.quantity+quantity;
    const message="Confrim"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.message = this.itemService.updateItem(this.itemId,{quantity: newQuantity}).then(
            x=>{
              this.ngOnInit();
              return "Update is done";
             
            }
          ).catch(
            error=>{error}
          )
        }
      }
    );
    console.log(this.message);


      
  }

  onClickManual(){
    this.manual=!this.manual;
    this.byScaler=!this.byScaler;
    this.method=" manualy"
  }
  onClickScaler(){
    this.byScaler=!this.byScaler;
    this.manual=!this.manual;
    this.method = "by scaler"
  }
  resetQuantityForm(){
    this.updateQuantityForm.reset();
  }

}
