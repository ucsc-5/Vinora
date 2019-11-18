import { Component, OnInit } from '@angular/core';
import { StockManagerId, StockManagerService, StockManager } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileUpload } from 'src/app/uploads/shared/file-upload';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-stock-manager-profile',
  templateUrl: './stock-manager-profile.component.html',
  styleUrls: ['./stock-manager-profile.component.css']
})
export class StockManagerProfileComponent implements OnInit {

  message: any;
  
  private basePath = 'stockManagers';
  selectedFiles: FileList;
  currentFileUpload: FileUpload;

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;
  downloadURL: Observable<any>;


  constructor(private StockManagerService:StockManagerService,private afAuth:AngularFireAuth,private storage:AngularFireStorage,private dialogService:DialogService) {
    this.stockManagerEmail= this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail); 
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
