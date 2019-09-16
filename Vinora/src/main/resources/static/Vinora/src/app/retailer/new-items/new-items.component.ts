import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-items',
  templateUrl: './new-items.component.html',
  styleUrls: ['./new-items.component.css']
})
export class NewItemsComponent implements OnInit {

  selectedItem : Item[];

  item:Item;

   constructor(private http:HttpClient) {
   }

  ngOnInit() {
   

    // console.log(this.item);    
  }
}
