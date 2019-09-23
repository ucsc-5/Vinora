import { Injectable } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Vehicle } from '../manager/vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private dbPath = '/vehicles';

  vehicleRef: AngularFireList<Vehicle> = null;


  constructor(private db: AngularFireDatabase) { 
    this.vehicleRef = this.db.list(this.dbPath);
  }

  createVehicle(vehicle: Vehicle): void {
    this.vehicleRef.push(vehicle);
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
