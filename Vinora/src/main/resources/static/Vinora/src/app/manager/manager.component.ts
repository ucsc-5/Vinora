import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../service/vehicle.service';
import { Observable, Subscription, BehaviorSubject, Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';
import {  ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [VehicleService]
})
export class ManagerComponent implements OnInit {

  // manager$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  // size$: BehaviorSubject<string|null>;
  
  opened = true;
  
  userId: string;

  constructor(private db: AngularFireDatabase,private route:ActivatedRoute, private companyService:CompanyService) { 
    
  }

  ngOnInit() {
    // this.route.params.subscribe((param:Params)=>{
    //         this.userId = param['id']; 
    // })
    // this.companyService.getCompany(this.userId);
  }

 

  log(state){
    console.log(state)
  }

}
