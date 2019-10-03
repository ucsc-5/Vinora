import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-retailer-registered-companies',
  templateUrl: './retailer-registered-companies.component.html',
  styleUrls: ['./retailer-registered-companies.component.css']
})
export class RetailerRegisteredCompaniesComponent implements OnInit {

  company$: Observable<any>;
  size$: BehaviorSubject<string|null>;

  constructor(private db: AngularFireDatabase) {

    this.size$ = new BehaviorSubject(null);
    this.company$ = this.size$.pipe(
      switchMap(size => 
        this.db.list('/delivery_Companies', ref =>
          size ? ref.orderByChild('registered_Retailers').orderByKey().equalTo(size) : ref
        ).snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        )
      )
    );

    this.size$.next('jmLEedg9fMSshHJ82QcRMwya4V12');
    
   }

  ngOnInit() {

  }

}
