import { Component, OnInit, OnDestroy } from '@angular/core';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
;
import { Item } from '../service/item.model';


@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css'],
})
export class RetailerComponent {

  itemSelected: Item;


  opened = false;

  constructor(){

  }

  ngOnInit(){
    
  }
 
}
  