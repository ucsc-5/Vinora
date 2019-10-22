import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-representative',
  templateUrl: './sales-representative.component.html',
  styleUrls: ['./sales-representative.component.css']
})
export class SalesRepresentativeComponent implements OnInit {

  constructor( private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  onRegister(){
    this.router.navigate(['registerSalesRepresentative'],{relativeTo: this.route})
  }

}
