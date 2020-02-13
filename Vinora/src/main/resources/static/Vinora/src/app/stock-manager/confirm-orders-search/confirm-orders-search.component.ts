import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-confirm-orders-search',
  templateUrl: './confirm-orders-search.component.html',
  styleUrls: ['./confirm-orders-search.component.css']
})
export class ConfirmOrdersSearchComponent implements OnInit {


  fromDate;
  toDate;

  constructor() { }

  ngOnInit() {
    this.fromDate= new Date();
  }

  onSearch(){
    console.log(this.fromDate);     
  }

}
