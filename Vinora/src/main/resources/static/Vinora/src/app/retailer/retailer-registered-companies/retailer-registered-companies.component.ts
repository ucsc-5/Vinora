import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService } from 'src/app/service/retailer.service';
@Component({
  selector: 'app-retailer-registered-companies',
  templateUrl: './retailer-registered-companies.component.html',
  styleUrls: ['./retailer-registered-companies.component.css']
})
export class RetailerRegisteredCompaniesComponent implements OnInit {

  companyKeys$: Observable<any>;
  size$: BehaviorSubject<string|null>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private retailerService: RetailerService) {

    const retailerId = this.afAuth.auth.currentUser.uid;
    this.companyKeys$=this.retailerService.getRegisteredCompaniesList(retailerId);
    
   }

  ngOnInit() {
     this.companyKeys$.subscribe(res=>{console.log(res)});
  }

}
