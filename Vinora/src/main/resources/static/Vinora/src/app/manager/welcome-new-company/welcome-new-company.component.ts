import { Component, OnInit } from '@angular/core';
import { Router,  } from '@angular/router';

@Component({
  selector: 'app-welcome-new-company',
  templateUrl: './welcome-new-company.component.html',
  styleUrls: ['./welcome-new-company.component.css']
})
export class WelcomeNewCompanyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }



}
