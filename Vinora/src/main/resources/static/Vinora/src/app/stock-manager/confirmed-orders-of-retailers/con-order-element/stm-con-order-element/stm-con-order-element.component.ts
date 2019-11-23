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
  constructor(private dialogService:DialogService,private tempOrder:StmConfirmOrderTempService) { }

  ngOnInit() {
  }

  onAdd(){
    console.log(this.orderId);
    
    this.dialogService.openItemDialog(this.item).afterClosed().subscribe(
      res=>{
        if(res){
          this.dialogService.openConfirmDialog("confirm").afterClosed().subscribe(
            res2=>{
              if(res2){
                this.tempOrder.addItems(this.item,this.orderId);
              }
            }
          )
        }
        
        })

    console.log(this.item);
    
  }

}


