import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  myvehicle:Vehicle;


  constructor(private vehicleService:VehicleService) {
    
   }

  ngOnInit() {
  }


  // onRegisterVehicle(){
  //   const myVehicle;
  //   this.vehicleService.storeVehicle(m)
  // }

}
