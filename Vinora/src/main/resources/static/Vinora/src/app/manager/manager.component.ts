import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../service/vehicle.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { AngularFireAuth } from  "@angular/fire/auth";
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [VehicleService]
})
export class ManagerComponent implements OnInit {

  constructor(private db: AngularFireDatabase,private authService : AuthenticationService,private  afAuth:  AngularFireAuth) { 

  }

  ngOnInit() {
  }

  opened = false;

  log(state){
    console.log(state)
  }

}
