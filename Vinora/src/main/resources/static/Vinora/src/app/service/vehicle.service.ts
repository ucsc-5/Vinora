import { Injectable } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../uploads/shared/file-upload';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private dbPath = '/vehicles';
  private basePath = '/vehicles';



  constructor(private db: AngularFireDatabase,private storage: AngularFireStorage) { 
    
  }

  
  pushFileToStorage(fileUpload: FileUpload): Observable<any> {
    const filePath = `${this.basePath}/${fileUpload.file.name}${new Date()}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }



 

  // pushUpload(upload: Upload) {
  //   let storageRef = firebase.storage().ref();
  //   let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) =>  {
  //       // upload in progress
  //       upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     },
  //     (error) => {
  //       // upload failed
  //       console.log(error)
  //     },
  //     () => {
  //       // upload success
  //       upload.url = uploadTask.snapshot.downloadURL
  //       upload.name = upload.file.name
  //       this.saveFileData(upload)
  //     }
  //   );
  // }



  // Writes the file details to the realtime db
  private saveFileData(fileUpload: FileUpload) {
    // this.db.list(`${this.basePath}/`).push(upload);
    this.db.list(this.basePath).push(fileUpload);
  }

  getFileUploads(numberItems): AngularFireList<any> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }


  
  
  private deleteFileDatabase(key: string) {
    return this.db.list(this.basePath).remove(key);
  }
  
  private deleteFileStorage(name: string) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  



  // form = new FormGroup({
  //   $id : new FormControl(null),
  //   number_plate: new FormControl(''),
  //   vehicle_model : new FormControl(''),
  //   owner_name : new FormControl(''),
  //   owner_address: new FormControl(''),
  //   owner_mobile: new FormControl(''),
   
   


  // });

 

}
