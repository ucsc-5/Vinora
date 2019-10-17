import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUpload  } from '../../../uploads/shared/file-upload';

@Component({
  selector: 'app-vehicle-display',
  templateUrl: './vehicle-display.component.html',
  styleUrls: ['./vehicle-display.component.css']
})
export class VehicleDisplayComponent implements OnInit {
  @Input()  vehicle :FileUpload
  constructor() { }

  ngOnInit() {
  }

}
