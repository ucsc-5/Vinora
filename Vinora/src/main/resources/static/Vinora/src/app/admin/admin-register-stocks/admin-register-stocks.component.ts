import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-register-stocks',
  templateUrl: './admin-register-stocks.component.html',
  styleUrls: ['./admin-register-stocks.component.css']
})
export class AdminRegisterStocksComponent implements OnInit {

  title = 'Angular8Firebase';
  description = 'Angular-Fire-Demo';
 
  itemValue = '';
  items: Observable<any[]>;
 
  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }
 
  onSubmit() {
    this.db.list('items').push({ content: this.itemValue});
    this.itemValue = '';
  }

  ngOnInit(){

  }

}
