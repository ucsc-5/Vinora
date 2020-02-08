import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/uploads/shared/file-upload';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { CustomPasswordValidator } from 'src/app/shared/custom-password-validator';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
  message: any;
  
  private basePath = 'managers';
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  hide = true;
  valid = false;
  type = 'retailer';

  manager: Observable<CompanyId[]>;
  managerEmail: string;
  downloadURL: Observable<any>;

  resetPasswordForm: FormGroup


  constructor(private ManagerService:CompanyService,private afAuth:AngularFireAuth,private storage:AngularFireStorage,private dialogService:DialogService) {
    this.managerEmail= this.afAuth.auth.currentUser.email;    
   }

  ngOnInit() {
    this.manager= this.ManagerService.getCompanyByEmail(this.managerEmail);
    
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
      'confirmPassword': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

    this.resetPasswordForm.statusChanges.subscribe(state=>{
      console.log(state);
      
      if(state=="VALID"){
        this.valid=true;
      }else{
        this.valid=false;
      }
    })      
  }

  
  onAddImage(manager:CompanyId){
      console.log(manager.id);
      console.log("logged in");
      // console.log(manager.managerName);

      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      const filePath = `${this.basePath}/${file.name}${new Date()}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);
      uploadTask.snapshotChanges().pipe(
        finalize(() => 
        storageRef.getDownloadURL().subscribe(durl=>{
          const photoUrl:string=durl;
          console.log(photoUrl);
            this.ManagerService.updateProfilePicture(manager.id,{imagePath:photoUrl});
            // this.StockManagerService.updatePhoneNumber(stockManager.id,{})
        })
         )
     )
    .subscribe()

  }     

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  updateContactnumber(form:NgForm,manager:CompanyId){
    
    const value1=form.value;
    this.message = this.ManagerService.updatePhoneNumber(manager.id,value1);
     console.log(this.message);
  }

  onResetPassword(){
    console.log(this.resetPasswordForm.value.password);
    this.afAuth.auth.currentUser.updatePassword(this.resetPasswordForm.value.password);

  }


}

