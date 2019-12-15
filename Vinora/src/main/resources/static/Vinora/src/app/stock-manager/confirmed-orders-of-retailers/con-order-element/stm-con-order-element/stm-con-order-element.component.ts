import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { StmConfirmOrderTempService } from 'src/app/service/stm-confirm-order-temp.service';

@Component({
  selector: 'app-stm-con-order-element',
  templateUrl: './stm-con-order-element.component.html',
  styleUrls: ['./stm-con-order-element.component.css']
})
export class StmConOrderElementComponent implements OnInit {

  @Input() item:CartItemId
  @Input() orderId:string
  @Input() buttonFalse: Boolean
  @Input() orderTotal: number

  constructor(private dialogService:DialogService,private tempOrder:StmConfirmOrderTempService) { }

  ngOnInit() {
  }

  onAdd(){
    console.log(this.orderId);
    
    this.dialogService.confirmItemDialog(this.item).afterClosed().subscribe(
      res=>{
        if(res){
          this.dialogService.openConfirmDialog("confirm").afterClosed().subscribe(
            res2=>{
              if(res2){
                this.tempOrder.addItems(this.item,this.orderId,this.orderTotal);
              }
            }
          )
        }
        
        })

    console.log(this.item);
    
  }

  onDrop(){

    this.dialogService.openConfirmDialog("confirm").afterClosed().subscribe(
      res=>{
        if(res){
          this.tempOrder.dropItems(this.item.id,this.orderId).then(response=>{
            console.log("Item droped");
          }).catch(er=>{
            console.log("The Error "+er);
          })
        }})
  }

}


