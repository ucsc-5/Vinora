import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { RetailerItemService } from 'src/app/retailer/retailer-items/retailer-item.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-item-element-selected',
  templateUrl: './new-item-element-selected.component.html',
  styleUrls: ['./new-item-element-selected.component.css']
})
export class NewItemElementSelectedComponent implements OnInit {

  @Input()
  item : Item;
  // @Input()
  // i : number;


   constructor(private itemService:RetailerItemService, private http:HttpClient) {
   
  }

ngOnInit() {
  this.http.get('https://vinora-dc8a2.firebaseio.com/Retailer/Selected-Items.json').subscribe(
    (reponse: Response) =>{
      const newItems : any = reponse.json;
      // console.log(newItems);
      this.item= newItems;
    }
  )
}

}
