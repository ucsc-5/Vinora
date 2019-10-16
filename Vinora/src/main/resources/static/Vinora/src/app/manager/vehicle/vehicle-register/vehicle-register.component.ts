import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../service/vehicle.service';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../vehicle.model';
import { FileUpload } from 'src/app/uploads/shared/file-upload';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegisterComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;


  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
  }
  onAddVehicle(form: NgForm){
    const value = form.value;
    const vehicle = new Vehicle(value.number_plate,value.vehicle_model,value.owner_name,value.owner_mobile,value.owner_address);
    this.vehicleService.createVehicle(vehicle);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
}
upload() {
  const file = this.selectedFiles.item(0);
  this.selectedFiles = undefined;

  this.currentFileUpload = new FileUpload(file);
  this.vehicleService.pushFileToStorage(this.currentFileUpload).subscribe(
    percentage => {
      this.percentage = Math.round(percentage);
    },
    error => {
      console.log(error);
    }
  );
}
}


