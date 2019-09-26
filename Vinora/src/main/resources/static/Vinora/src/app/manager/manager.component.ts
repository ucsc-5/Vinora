import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../service/vehicle.service';
import { Observable, Subscription, BehaviorSubject, Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';
import {  ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [VehicleService]
})
export class ManagerComponent implements OnInit {

  manager$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  userId: string;

  constructor(private db: AngularFireDatabase,private route:ActivatedRoute) { 

    this.size$ = new BehaviorSubject(null);
        this.manager$ = this.size$.pipe(
          switchMap(size => 
            this.db.list('/stocks', ref =>
              size ? ref.orderByKey().equalTo(size) : ref
            ).snapshotChanges()
          )
        );
        this.size$.next('SW80OlqOMFaxad3G92nMqXGhyyn2');
  }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
            this.userId = param['id']; 
    })
    console.log(this.userId)
    // this.size$.next('SW80OlqOMFaxad3G92nMqXGhyyn2');
  }

  opened = false;

  log(state){
    console.log(state)
  }

}
