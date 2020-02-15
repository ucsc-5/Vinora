import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { OrderService } from 'src/app/service/order.service';


@Component({
  selector: 'app-stm-con-order-element',
  templateUrl: './stm-con-order-element.component.html',
  styles:[`
    .online{
      color: red;
    }
  `],
  styleUrls: ['./stm-con-order-element.component.css']
})
export class StmConOrderElementComponent implements OnInit {

  @Input() item:CartItemId
  @Input() orderId:string
  added: Boolean
  
  @Input() orderTotal: number

  constructor(private dialogService:DialogService,private orderService:OrderService) { }

  ngOnInit() {
    if(this.item.stmadded){
      this.added=true;
    }else{
      this.added=false;
    }
  }

  onAdd(){
    console.log(this.orderId);
    
    this.dialogService.confirmItemDialog(this.item).afterClosed().subscribe(
      res=>{
        if(res){
          this.dialogService.openConfirmDialog("confirm").afterClosed().subscribe(
            res2=>{
              if(res2){
                this.orderService.stockManagerAddItem(this.orderId,this.item.id,this.item.total);
                // this.tempOrder.addItems(this.item,this.orderId,this.orderTotal);
              }
            }
          )
        }
        
        })

        this.ngOnInit()

    console.log(this.item);
    
  }

  onDrop(){

    this.dialogService.openConfirmDialog("confirm").afterClosed().subscribe(
      res=>{
        if(res){
          this.orderService.stockManagerDropItem(this.orderId,this.item.id,this.item.total);
        }})
  }

}


