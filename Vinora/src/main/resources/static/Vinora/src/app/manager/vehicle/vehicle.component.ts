import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  myvehicle:Vehicle;


  constructor(private route:ActivatedRoute, private router: Router, private vehicleService:VehicleService) {
    
   }

  ngOnInit() {
  }


  // onRegisterVehicle(){
  //   const myVehicle;
  //   this.vehicleService.storeVehicle(m)
  // }

  onRegister(){
    this.router.navigate(['register'],{relativeTo: this.route})
  }
}
