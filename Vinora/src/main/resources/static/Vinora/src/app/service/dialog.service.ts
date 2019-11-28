import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/popups/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../shared/popups/error-dialog/error-dialog.component';
import { ConfirmItemPopupComponent } from '../shared/popups/confirm-item-popup/confirm-item-popup.component';
import { CartItemId } from './cart.service';
import { ItemDetailsPopupComponent } from '../shared/popups/item-details-popup/item-details-popup.component';
import { ItemId } from './item.service';
import { ResetPasswordPopupComponent } from '../shared/popups/reset-password-popup/reset-password-popup.component';


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

   openCartItemDetailsDialog(item:CartItemId){
    return this.dialog.open(ItemDetailsPopupComponent,{
      width: '580px',
      height: '800px',
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


   confirmItemDialog(item:CartItemId){
    return this.dialog.open(ConfirmItemPopupComponent,{
      width: '580px',
      height: '800px',
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

   openItemDetailsDialog(item:ItemId){
    return this.dialog.open(ItemDetailsPopupComponent,{
      width: '580px',
      height: '800px',
      disableClose: true,
      panelClass: 'confirm-dialog-container', 
      
      data:{
        itemName: item.itemName,
        brand: item.brand,
        description: item.description,
        itemImagePath:item.itemImagePath,
        unitPrice:item.unitPrice,
        quantity:item.quantity
      }
    }) 
   }

   openPaswordReset(message:string){
    return this.dialog.open(ResetPasswordPopupComponent,{
      width: '580px',
      height: '800px',
      disableClose: true,
      // panelClass: 'confirm-dialog-container', 
      
      data:{
        message: message
      }
    
    }) 
    
   }

}
