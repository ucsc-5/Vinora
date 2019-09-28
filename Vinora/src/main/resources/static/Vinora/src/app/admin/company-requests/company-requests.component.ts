import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company-requests',
  templateUrl: './company-requests.component.html',
  styleUrls: ['./company-requests.component.css']
})
export class CompanyRequestsComponent implements OnInit {

  companies$: Observable<any[]>;
  length: any;

  constructor(private companyService:CompanyService) {
    this.companies$ = this.companyService.requestCompanies$; 
  }

  ngOnInit() {
       
  }

}
