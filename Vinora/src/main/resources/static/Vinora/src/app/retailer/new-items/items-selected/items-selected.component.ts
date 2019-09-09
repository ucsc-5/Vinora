import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { RetailerItemService } from '../../retailer-items/retailer-item.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-items-selected',
  templateUrl: './items-selected.component.html',
  styleUrls: ['./items-selected.component.css']
  
})
export class ItemsSelectedComponent implements OnInit {

  @Input() item : Item;

  items: Item[];

  constructor(private itemService:RetailerItemService, private http:HttpClient) {
   
    }

  ngOnInit() {
    this.http.get('https://vinora-dc8a2.firebaseio.com/Retailer/Selected-Items.json').subscribe(
      (reponse: Response) =>{
        const newItems : any = reponse.json;
        console.log(newItems);
        this.items= newItems;
      }
    )
}
}
