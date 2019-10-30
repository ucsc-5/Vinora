import { Component, OnInit } from '@angular/core';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-retailer-dashboard',
  templateUrl: './retailer-dashboard.component.html',
  styleUrls: ['./retailer-dashboard.component.css']
})
export class RetailerDashboardComponent implements OnInit {

  retailer: Observable<RetailerId[]>;
  retailerEmail: string

  constructor(private retailerService:RetailerService,private afAuth: AngularFireAuth) { 
    this.retailerEmail = this.afAuth.auth.currentUser.email;
  }

  ngOnInit() {
     this.retailer = this.retailerService.getRetailerByEmail(this.retailerEmail);
  }

}
