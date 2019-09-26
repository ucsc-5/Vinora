import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-display',
  templateUrl: './vehicle-display.component.html',
  styleUrls: ['./vehicle-display.component.css']
})
export class VehicleDisplayComponent implements OnInit {
  @Input()  vehicle :Vehicle
  constructor() { }

  ngOnInit() {
  }

}
