import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle/vehicle.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [VehicleService]
})
export class ManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  opened = false;

  log(state){
    console.log(state)
  }

}
