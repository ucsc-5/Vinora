import { Injectable } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Vehicle } from '../manager/vehicle/vehicle.model';
import { Upload } from '../uploads/shared/upload';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private dbPath = '/vehicles';
  private basePath:string = '/uploads';
  uploads: AngularFireList<Upload[]>;

  vehicleRef: AngularFireList<Vehicle> = null;


  constructor(private db: AngularFireDatabase) { 
    this.vehicleRef = this.db.list(this.dbPath);
  }

  createVehicle(vehicle: Vehicle): void {
    this.vehicleRef.push(vehicle);
  }

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    );
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
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
