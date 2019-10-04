import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-retailer-registered-companies',
  templateUrl: './retailer-registered-companies.component.html',
  styleUrls: ['./retailer-registered-companies.component.css']
})
export class RetailerRegisteredCompaniesComponent implements OnInit {

  company$: Observable<any>;
  size$: BehaviorSubject<string|null>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    const retailerId = this.afAuth.auth.currentUser.uid;
    this.size$ = new BehaviorSubject(null);
    this.company$ = this.size$.pipe(
      switchMap(size => 
        this.db.list(`retaiers/${retailerId}/registered_Companies`, ref =>
          size ? ref.orderByKey() : ref
        ).snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        )
      )
    );
    
   }

  ngOnInit() {
     this.company$.subscribe(res=>{console.log(res)});
  }

}
