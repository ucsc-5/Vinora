import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute,Params,RouterEvent} from '@angular/router';
import { ItemService, Item, ItemId } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { NgForm,FormGroup, FormControl, Validators} from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';

@Component({
  selector: 'app-stm-update-item-unitvalue',
  templateUrl: './stm-update-item-unitvalue.component.html',
  styleUrls: ['./stm-update-item-unitvalue.component.css']
})
export class StmUpdateItemUnitvalueComponent implements OnInit {

  @Input() scalerRead: number;
  item : Item
  itemId:string;
  updateUnitValueForm: FormGroup;
  updateUnitValueFormValid=false;
  manual:boolean = true;
  byScaler: boolean = false;
  method = ' manual'
  message

  constructor(private route:ActivatedRoute,private itemService:ItemService,private dialogService:DialogService) { 
    console.log(this.scalerRead+" this i womfjghascxkgasvxhvas");
    
  }

  ngOnInit() {

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
          this.item = {brand,category,companyId,description,itemImagePath,itemName,quantity,reOrderingLevel,state,type,unitPrice,unitValue};
          
        }
      )
      

    this.updateUnitValueForm = new FormGroup({
      'unitValue': new FormControl(null,[Validators.min(0)])
    })

    this.updateUnitValueForm.statusChanges.subscribe(state=>{
      console.log(state);
      
      if(state=="VALID"){
        this.updateUnitValueFormValid=true;
      }else{
        this.updateUnitValueFormValid=false;
      }
    })
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

  resetUnitValueForm(){
    this.updateUnitValueForm.reset();
  }

  updateUnitValue() {
    const unitValue = this.updateUnitValueForm.value.unitValue;
    console.log(unitValue);
    
    
    
    const message="Confrim"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.message = this.itemService.updateItem(this.itemId,{unitValue: unitValue}).then(
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

}
