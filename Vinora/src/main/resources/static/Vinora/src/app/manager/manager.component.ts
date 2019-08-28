import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
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
