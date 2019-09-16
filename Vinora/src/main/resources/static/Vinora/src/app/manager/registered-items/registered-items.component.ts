import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registered-items',
  templateUrl: './registered-items.component.html',
  styleUrls: ['./registered-items.component.css']
})
export class RegisteredItemsComponent implements OnInit {

  items: Observable<any[]>;
 
  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }

  ngOnInit() {
  }

}
