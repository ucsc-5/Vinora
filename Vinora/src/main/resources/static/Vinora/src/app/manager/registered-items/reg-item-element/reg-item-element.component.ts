import { Component, OnInit, Input } from '@angular/core';
import {  CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemService, ItemId } from 'src/app/service/item.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-reg-item-element',
  templateUrl: './reg-item-element.component.html',
  styleUrls: ['./reg-item-element.component.css']
})
export class RegItemElementComponent implements OnInit {

  @Input() item:ItemId
  message: any;
  allowRemove: boolean;
  updateForm: FormGroup

  constructor(private dialogService:DialogService, private itemService:ItemService, private afAuth: AngularFireAuth) {
      
  }

  ngOnInit() {
    if(this.item.quantity>0){
      this.allowRemove = true; 
     } else{
       this.allowRemove = false;
     }

     this.updateForm = new FormGroup({
      'unitPrice': new FormControl(null,[Validators.min(0)])
    });
  }

  onRemove(){
    if(this.item.quantity==0){
      
      const message=" Are you sure !"
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){ 
                
              this.message = this.itemService.updateItem(this.item.id,{state: "deleted"}).then(
                x=>{
                  return "Deleted";
                }
              ).catch(
                error=>{error}
              )
                    }
                  }
                )

    }else{
      // const message=" Are you sure !"
      // this.dialogService.openErrorDialog(message).afterClosed().subscribe(
      //   res=>{
      //   })
      // return "You can't delete this item ";
    }    
  }

  OnUpdateUnitPrice() {
      const unitPrice=this.updateForm.value.unitPrice;
      const message= "Confirm !!"
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){      
            this.message = this.itemService.updateItem(this.item.id,{unitPrice: unitPrice}).then(
              x=>{
                return "done";
              }
            ).catch(
              error=>{error}
            )
    }}
    )
  }

  reset(){
    this.updateForm.reset();
  }

  itemDetails(item:ItemId){
    this.dialogService.openItemDetailsDialog(item).afterClosed();
  }

}
