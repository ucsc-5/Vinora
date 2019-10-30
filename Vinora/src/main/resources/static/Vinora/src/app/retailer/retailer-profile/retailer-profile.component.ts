import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerService, RetailerId } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-retailer-profile',
  templateUrl: './retailer-profile.component.html',
  styleUrls: ['./retailer-profile.component.css']
})
export class RetailerProfileComponent implements OnInit {

  retailer: Observable<RetailerId[]>
  retailerEmail: string;

  constructor(private retailerService:RetailerService,private afAuth: AngularFireAuth) {
    this.retailerEmail= this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.retailer= this.retailerService.getRetailerByEmail(this.retailerEmail)
  }

}
