import { Component, OnInit , Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomPasswordValidator } from '../../custom-password-validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-reset-password-popup',
  templateUrl: './reset-password-popup.component.html',
  styleUrls: ['./reset-password-popup.component.css']
})
export class ResetPasswordPopupComponent implements OnInit {

  hide = true;
  valid = false;
  resetPasswordForm: FormGroup;
  message
  email
  password
  

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ResetPasswordPopupComponent>,private afAuth: AngularFireAuth,private fns: AngularFireFunctions,private authService:AuthenticationService) {
    
   }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'currentPassword': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,
        [ Validators.required,Validators.minLength(6),
          CustomPasswordValidator.patternValidator(/\d/, { hasNumber: true }),
          CustomPasswordValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomPasswordValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // CustomPasswordValidator.patternValidator(/[!@#$%^&*()_+-=[\]{};':"|,.<>?]/,{ hasSpecialCharacters: true }),
          // CustomPasswordValidator.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?(<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?>)]/, { hasSpecialCharacters: true }),
          // CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),   
    ]),
      'confirmPassword': new FormControl(null,[Validators.required,Validators.minLength(6)])
      
    });

    this.resetPasswordForm.statusChanges.subscribe(state=>{
      console.log(state);
      if(state=="VALID"){
        this.valid=true;
      }else{
        this.valid=false;
      }
    });    
  }
  
  onResetPassword(){

    this.email = this.resetPasswordForm.value.email;
    this.password = this.resetPasswordForm.value.password;
    this.authService.login(this.email,this.password).then(res=>{
      this.resetPasswordForm.setValue({'email' : new FormControl(null), 'currentPassword': new FormControl(null)});
      this.message="Please check your email and password again!!"           
     }).catch(error=>{
       console.log(" this is the error  "+error);
      
     })
   

   
     
        // this.afAuth.auth.currentUser.updatePassword(this.resetPasswordForm.value.password);
        // const callable =  this.fns.httpsCallable('setPasswordTrue');
        //                           callable({email:this.email}).subscribe(
        //                             (response)=>{
        //                                 console.log(response);     
        //                             },()=>{},
        //                             ()=>{
        //                               this.dialogRef.close(true);
        //                             });
   

  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}
