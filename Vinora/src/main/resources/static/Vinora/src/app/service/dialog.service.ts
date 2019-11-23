import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ConfirmItemPopupComponent } from '../stock-manager/confirmed-orders-of-retailers/confirm-item-popup/confirm-item-popup.component';
import { CartItemId } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { 

  }

  openConfirmDialog(message){
   return this.dialog.open(ConfirmDialogComponent,{
     width: '390px',
     disableClose: true,
     panelClass: 'confirm-dialog-container',
     data:{
       message: message
     }

   }) 
  }

  openErrorDialog(message){
    return this.dialog.open(ErrorDialogComponent,{
      width: '390px',
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      data:{
        message: message
      }
    }) 
   }

   openItemDialog(item:CartItemId){
    return this.dialog.open(ConfirmItemPopupComponent,{
      width: '600px',
      height: '700px',
      disableClose: true,
      panelClass: 'confirm-dialog-container', 
      

      data:{
        itemName: item.itemName,
        brand: item.brand,
        description: item.description,
        itemImagePath:item.itemImagePath,
        unitPrice:item.unitPrice,
        quantity:item.quantity,
        total:item.total
      }
    }) 
   }

}
