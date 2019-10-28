import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  
  opened = true;

  log(state){
    console.log(state)
  }


}
