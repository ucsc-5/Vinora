import { Component, OnInit, OnDestroy } from '@angular/core';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent {

  opened = false;

  log(state){
    console.log(state)
  }
 
}
  