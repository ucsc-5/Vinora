import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  items: Observable<any[]>;
 
  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }
  ngOnInit() {
    console.log(this.items);
  }

}
