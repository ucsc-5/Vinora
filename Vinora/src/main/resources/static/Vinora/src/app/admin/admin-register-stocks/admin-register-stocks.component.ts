import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-register-stocks',
  templateUrl: './admin-register-stocks.component.html',
  styleUrls: ['./admin-register-stocks.component.css']
})
export class AdminRegisterStocksComponent implements OnInit {
 
  // manager$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  // managers$ :Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  stocks : Observable<any[]>;
  size$: BehaviorSubject<string|null>;

  constructor(public db: AngularFireDatabase) {
    this.size$ = new BehaviorSubject(null);

        this.stocks = this.size$.pipe(switchMap(size => 
            this.db.list('/delivery_Companies', ref => size ? ref.orderByChild('state').equalTo(size) : ref
            ).snapshotChanges().pipe(
              map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
          )
        );

        this.size$.next('0');
        console.log(this.stocks);
  
  }
 

  ngOnInit(){

  }

}
