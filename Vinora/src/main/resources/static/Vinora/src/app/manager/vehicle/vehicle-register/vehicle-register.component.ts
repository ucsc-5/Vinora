import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../service/vehicle.service';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'src/app/uploads/shared/file-upload';
import { FormControl, FormGroup } from "@angular/forms";
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
export interface VehicleInterface{
  number:string;
  model:string;
  ownerName:string;
  ownerAddress:string;
  ownerMobile:string;
  photo_url:string;
}
@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegisterComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number=0;
  private basePath = '/vehicles';
  private vehicleCollection: AngularFirestoreCollection<VehicleInterface>;
  companies: Observable<VehicleInterface[]>;
  vehicleProfileForm = new FormGroup({
    $id: new FormControl(""),
    number_plate: new FormControl(""),
    vehicle_model: new FormControl(""),
    owner_name: new FormControl(""),
    owner_address: new FormControl(""),
    owner_mobile: new FormControl("")
    
  });

  constructor(private afAuth: AngularFireAuth,private readonly afs: AngularFirestore,private vehicleService:VehicleService,private storage: AngularFireStorage) {
    const uid=this.afAuth.auth.currentUser.uid;
    this.vehicleCollection = afs.collection<VehicleInterface>(`companies/${uid}/vehicles`);
    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. See the addItem()
    // method below for how to persist the id with
    // valueChanges()
    this.companies = this.vehicleCollection.valueChanges();
   }

  ngOnInit() {
  }
  
  onAddVehicle(form: NgForm){
    const value = form.value;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    const filePath = `${this.basePath}/${file.name}${new Date()}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    const number:string=value.number_plate;
    const model:string=value.vehicle_model;
    const ownerName:string=value.owner_name;
    const ownerAddress:string=value.owner_address;
    const ownerMobile:string=value.owner_mobile;
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log("DURL"+downloadURL);
          
          const photo_url:string=downloadURL;
          const vehicle1:VehicleInterface={number,model,ownerName,ownerAddress,ownerMobile,photo_url};
          this.vehicleCollection.add(vehicle1);
          console.log("Success")
        });
      })
    )

    uploadTask.percentageChanges().subscribe(percentage=>{
      this.percentage=Math.round(percentage);
    });
    
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
}

}


