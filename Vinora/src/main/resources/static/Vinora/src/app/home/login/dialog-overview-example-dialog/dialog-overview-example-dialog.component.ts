import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialogComponent implements OnInit {
  email = new FormControl();
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,private authService : AuthenticationService) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  sendEmail(){
    this.authService.sendPasswordResetEmail(this.email.value);
    this.dialogRef.close();
  }

}
