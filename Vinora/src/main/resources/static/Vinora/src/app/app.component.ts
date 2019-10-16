import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl,FormGroup } from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vinora';

  description = 'Angular-Fire-Demo';
 
  itemValue = '';
  items: Observable<any[]>;
  vehicles: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
    this.vehicles = db.list('vehicles').valueChanges();
  }
 
  onSubmit() {
    this.db.list('items').push({ content: this.itemValue});
    this.itemValue = '';
  }
  
}
