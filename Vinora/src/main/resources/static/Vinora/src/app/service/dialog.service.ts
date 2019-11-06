import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';


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
}
