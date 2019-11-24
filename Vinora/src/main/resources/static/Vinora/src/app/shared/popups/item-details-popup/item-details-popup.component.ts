import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-item-details-popup',
  templateUrl: './item-details-popup.component.html',
  styleUrls: ['./item-details-popup.component.css']
})

export class ItemDetailsPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ItemDetailsPopupComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

}