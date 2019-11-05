import { Component, OnInit } from '@angular/core';
import { StockManagerId, StockManagerService, StockManager } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileUpload } from 'src/app/uploads/shared/file-upload';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-stock-manager-profile',
  templateUrl: './stock-manager-profile.component.html',
  styleUrls: ['./stock-manager-profile.component.css']
})
export class StockManagerProfileComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;


  constructor(private StockManagerService:StockManagerService,private afAuth:AngularFireAuth,private storage:AngularFireStorage) {
    this.stockManagerEmail= this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail);
  }

  selectFile(event){
    this.selectedFiles = event.target.files;
  }


  onAddImage(){
    // const file = this.selectedFiles.item(0);
    // const filePath = ;
    // const uploadTask = this.storage.upload(filePath,file);

  }

}
