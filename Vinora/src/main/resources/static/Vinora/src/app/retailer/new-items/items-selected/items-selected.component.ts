import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { RetailerItemService } from '../../retailer-items/retailer-item.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items-selected',
  templateUrl: './items-selected.component.html',
  styleUrls: ['./items-selected.component.css']
  
})
export class ItemsSelectedComponent implements OnInit {

  @Input() item : Item;

  items: Observable<any[]>; 
  itemsArray: any[];
     
  constructor(private http: HttpClient, private itemService:RetailerItemService,public db: AngularFireDatabase) {
    this.items = db.list('/Retailer/Selected-Items').valueChanges();
    console.log(this.items)
    }

  ngOnInit() {
    // this.items=this.itemService.getRetailerItemsSelected();
}
}
