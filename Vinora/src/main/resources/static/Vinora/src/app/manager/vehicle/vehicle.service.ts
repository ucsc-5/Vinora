import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicle ="Rangala"

  constructor() { }

  getVehicle(){
    return this.vehicle;
  }

  // storeVehicle(vehicle: Vehicle){
  //   // upload vehicle firbase
  // }

  // vehicleRetrive(){
  //   //get from database
  // }

}
