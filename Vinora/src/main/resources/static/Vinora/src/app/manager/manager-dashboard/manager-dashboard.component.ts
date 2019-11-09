import { Component, OnInit, Input } from '@angular/core';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

import { element } from 'protractor';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

 

  companyEmail;

  companies$: Observable<CompanyId[]>;

  constructor(private companyService: CompanyService,private afAuth: AngularFireAuth,private readonly afs: AngularFirestore) {
    this.companyEmail= this.afAuth.auth.currentUser.email
  
  }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

  ngOnInit() {
    this.companies$ = this.companyService.getCompanyByEmail(this.companyEmail);
  }
}