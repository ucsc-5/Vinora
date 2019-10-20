import { Component, OnInit } from '@angular/core';
import { RetailerService } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-retailer-dashboard',
  templateUrl: './retailer-dashboard.component.html',
  styleUrls: ['./retailer-dashboard.component.css']
})
export class RetailerDashboardComponent implements OnInit {

  retailer: Observable<any>;
  retailerId: string

  constructor(private retailerService:RetailerService,private afAuth: AngularFireAuth) { 
    this.retailerId = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.retailer= this.retailerService.getRetailer(this.retailerId);
  }

}
