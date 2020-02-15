import { Component, OnInit } from '@angular/core';
import { StockManagerId, StockManagerService, StockManager } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileUpload } from 'src/app/uploads/shared/file-upload';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm, FormControl, Validators, FormGroup  } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { CustomPasswordValidator } from 'src/app/shared/custom-password-validator';

@Component({
  selector: 'app-stock-manager-profile',
  templateUrl: './stock-manager-profile.component.html',
  styleUrls: ['./stock-manager-profile.component.css']
})
export class StockManagerProfileComponent implements OnInit {

  message: any;
  frobiddenContactNumbers: Array<string> = ['000000000','0000000000'];
  
  updateNumber: FormGroup;
  resetPasswordForm: FormGroup;

  private basePath = 'stockManagers';
  selectedFiles: FileList;
  currentFileUpload: FileUpload;

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;
  downloadURL: Observable<any>;
  valid;
  validtp;


  constructor(private StockManagerService:StockManagerService,private afAuth:AngularFireAuth,private storage:AngularFireStorage,private dialogService:DialogService) {
    this.stockManagerEmail= this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail); 

    let numericRegex = /^[0-9]+$/;

    let nicRanger = /^[vV0-9]+$/;


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

    this.updateNumber = new FormGroup({
      'contactNumber' : new FormControl(null,[Validators.required,Validators.minLength(9),Validators.maxLength(9),this.forbiddenContactNumbersValidator.bind(this),Validators.pattern(numericRegex)])
    });

    this.resetPasswordForm.statusChanges.subscribe(state=>{
      console.log(state);
      
      if(state=="VALID"){
        this.valid=true;
      }else{
        this.valid=false;
      }
    }) 

    this.updateNumber.statusChanges.subscribe(state=>{
      console.log(state);
      
      if(state=="VALID"){
        this.validtp=true;
      }else{
        this.validtp=false;
      }
    }) 

    
    
    

  }

  forbiddenContactNumbersValidator(control: FormControl):{[s:string]: boolean}{
    if(this.frobiddenContactNumbers.indexOf(control.value) != -1){
      return {'contactNumberForbidden': true};
    }
    return null;
  }

  
  onAddImage(stockManager:StockManagerId){
      console.log(stockManager.id);

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
            this.StockManagerService.updateProfilePicture(stockManager.id,{imagePath:photoUrl});
            // this.StockManagerService.updatePhoneNumber(stockManager.id,{})
        })
         )
     )
    .subscribe()

  }     

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  updateContactnumber(form:NgForm,stockManager:StockManagerId){

    
    const value1=form.value;
 
  this.message = this.StockManagerService.updatePhoneNumber(stockManager.id,value1);
       

  

    console.log(this.message);


    // this.StockManagerService.updatePhoneNumber(stockManager.id,{contactNumber:value1});

  }



}
