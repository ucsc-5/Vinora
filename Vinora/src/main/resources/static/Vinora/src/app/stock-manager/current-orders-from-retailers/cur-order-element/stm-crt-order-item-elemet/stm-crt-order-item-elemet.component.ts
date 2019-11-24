import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogService } from 'src/app/service/dialog.service';
import { StmConfirmOrderTempService } from 'src/app/service/stm-confirm-order-temp.service';

@Component({
  selector: 'app-stm-crt-order-item-elemet',
  templateUrl: './stm-crt-order-item-elemet.component.html',
  styleUrls: ['./stm-crt-order-item-elemet.component.css']
})
export class StmCrtOrderItemElemetComponent implements OnInit {

  @Input() item:CartItemId
  @Input() orderId: string

  constructor(private dialogService:DialogService,private tempOrder:StmConfirmOrderTempService) { }

  ngOnInit() {
  }

  onSelect(){
    console.log(this.orderId);
    this.dialogService.openItemDetailsDialog(this.item).afterClosed();
    console.log(this.item);
  }

}
