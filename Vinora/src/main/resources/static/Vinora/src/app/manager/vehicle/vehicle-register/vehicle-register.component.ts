import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../service/vehicle.service';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'src/app/uploads/shared/file-upload';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegisterComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number=0;


  vehicleProfileForm = new FormGroup({
    $id: new FormControl(""),
    number_plate: new FormControl(""),
    vehicle_model: new FormControl(""),
    owner_name: new FormControl(""),
    owner_address: new FormControl(""),
    owner_mobile: new FormControl("")
    
  });

  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
  }
  
  onAddVehicle(form: NgForm){
    const value = form.value;
    const file = this.selectedFiles.item(0);
  this.selectedFiles = undefined;

  this.currentFileUpload = new FileUpload(file,value.number_plate,value.vehicle_model,value.owner_name,value.owner_mobile,value.owner_address);
  this.vehicleService.pushFileToStorage(this.currentFileUpload).subscribe(
    percentage => {
      this.percentage = Math.round(percentage);
      
    },
    error => {
      console.log(error);
    }
  );
  
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
}

}


