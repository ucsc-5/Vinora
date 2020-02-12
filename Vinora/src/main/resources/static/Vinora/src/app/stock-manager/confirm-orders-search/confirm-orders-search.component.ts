import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-confirm-orders-search',
  templateUrl: './confirm-orders-search.component.html',
  styleUrls: ['./confirm-orders-search.component.css']
})
export class ConfirmOrdersSearchComponent implements OnInit {

  
  searchForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'fromDate': new FormControl(null,[Validators.required]),
      'toDate': new FormControl(null,[Validators.required])
  })

  }

  onSearch(){
    console.log(this.searchForm.value.fromDate);    
    console.log(this.searchForm.value.toDate);
    
  }

}
