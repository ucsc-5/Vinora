import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../service/vehicle.service';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegisterComponent implements OnInit {

  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
  }
  onAddVehicle(form: NgForm){
    const value = form.value;
    const vehicle = new Vehicle(value.number_plate,value.vehicle_model,value.owner_name,value.owner_mobile,value.owner_address);
    this.vehicleService.createVehicle(vehicle);
  }
}
