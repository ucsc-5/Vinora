import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../service/vehicle.service';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../vehicle.model';
import { Upload } from 'src/app/uploads/shared/upload';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegisterComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;


  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
  }
  onAddVehicle(form: NgForm){
    const value = form.value;
    const vehicle = new Vehicle(value.number_plate,value.vehicle_model,value.owner_name,value.owner_mobile,value.owner_address);
    this.vehicleService.createVehicle(vehicle);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
}
uploadSingle() {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.vehicleService.pushUpload(this.currentUpload)
}
}
