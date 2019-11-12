import { Component, OnInit, Input } from '@angular/core';
import {  CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
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

  constructor(private dialogService:DialogService, private itemService:ItemService, private afAuth: AngularFireAuth) {
 
  }

  ngOnInit() {

  }

  onRemove(){
    const message=" Are you sure !"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){ 
                
              this.message = this.itemService.updateItem(this.item.id,{state: "deleted"}).then(
                x=>{
                  return "done";
                }
              ).catch(
                error=>{error}
              )
                    }
                  }
                )
  }

  OnUpdateUnitPrice(form:NgForm) {
      const value=form.value;
      const message= "Confirm !!"
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){      
            this.message = this.itemService.updateItem(this.item.id,{unitPrice: value.unitPrice}).then(
              x=>{
                return "done";
              }
            ).catch(
              error=>{error}
            )
    }}
    )
  }

}
