import { Component, OnInit , Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomPasswordValidator } from '../../custom-password-validator';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-reset-password-popup',
  templateUrl: './reset-password-popup.component.html',
  styleUrls: ['./reset-password-popup.component.css']
})
export class ResetPasswordPopupComponent implements OnInit {

  hide = true;
  valid = false;
  emailMismatch = false;
  resetPasswordForm: FormGroup;
  userEmail;


  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ResetPasswordPopupComponent>,private afAuth: AngularFireAuth,private dialogService:DialogService) {
    this.userEmail=this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(null,
        [ Validators.required,Validators.minLength(6),
          CustomPasswordValidator.patternValidator(/\d/, { hasNumber: true }),
          CustomPasswordValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomPasswordValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // CustomPasswordValidator.patternValidator(/[!@#$%^&*()_+-=[\]{};':"|,.<>?]/,{ hasSpecialCharacters: true }),
          // CustomPasswordValidator.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?(<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?>)]/, { hasSpecialCharacters: true }),
          // CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),   
    ]),
      'confirmPassword': new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'email': new FormControl(null,[Validators.required,Validators.email])
    });

    if(this.userEmail===this.resetPasswordForm.value.email){
      this.emailMismatch = true
    }

    this.resetPasswordForm.statusChanges.subscribe(state=>{
      console.log(state);
      if(state=="VALID"){
        this.valid=true;
      }else{
        this.valid=false;
      }
    });    
  }
  
  // onResetPassword(){
  //   this.afAuth.auth.currentUser.updatePassword(this.resetPasswordForm.value.password);
  // }

  closeDialog(){
    this.dialogRef.close(false);
  }
}
