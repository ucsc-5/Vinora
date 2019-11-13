import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerService, RetailerId } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-retailer-profile',
  templateUrl: './retailer-profile.component.html',
  styleUrls: ['./retailer-profile.component.css']
})
export class RetailerProfileComponent implements OnInit {

  retailer: Observable<RetailerId[]>
  retailerEmail: string;
  selectedFiles: FileList;
  private basePath = 'retailers';


  constructor(private retailerService:RetailerService,private afAuth: AngularFireAuth,private storage:AngularFireStorage) {
    this.retailerEmail= this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.retailer= this.retailerService.getRetailerByEmail(this.retailerEmail)
  }
  selectFile(event){
    this.selectedFiles = event.target.files;
  }

    
  onAddImage(retailer:RetailerId){
    console.log(retailer.id);

    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    const filePath = `${this.basePath}/${file.name}${new Date()}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => 
      storageRef.getDownloadURL().subscribe(durl=>{
        const photourl:string=durl;
        console.log(photourl);
          this.retailerService.updateProfilePicture(retailer.id,{url:photourl});
          // this.StockManagerService.updatePhoneNumber(stockManager.id,{})
      })
       )
   )
  .subscribe()

} 

}
