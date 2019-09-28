import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-company-requests',
  templateUrl: './company-requests.component.html',
  styleUrls: ['./company-requests.component.css']
})
export class CompanyRequestsComponent implements OnInit {

  companies: Observable<any[]>;

  size$: BehaviorSubject<string|null>;

  constructor(db: AngularFireDatabase) {
    // this.companyRef = db.list('delivery_Companies');
    // // Use snapshotChanges().map() to store the key
    // this.companies = this.companyRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );

    this.size$ = new BehaviorSubject(null);
    this.companies = this.size$.pipe(
      switchMap(size => 
        db.list('/delivery_Companies', ref =>
          size ? ref.orderByChild('state').equalTo(size) : ref
        ).snapshotChanges().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
      )
    );

    this.size$.next("0");
  }

  ngOnInit() {
  }

}
