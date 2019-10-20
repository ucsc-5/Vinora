import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/service/item.model';
import { element } from 'protractor';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

 

  currentCompannyId;

  company: Observable<any[]>;

  constructor(private companyService: CompanyService,private afAuth: AngularFireAuth) {
    this.currentCompannyId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {

    this.company = this.companyService.getCompany(this.currentCompannyId);

  }

}