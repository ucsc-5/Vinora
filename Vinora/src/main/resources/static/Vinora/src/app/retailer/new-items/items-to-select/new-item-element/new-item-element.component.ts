
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { Input, OnInit, Component } from '@angular/core';
import { RetailerItemService } from 'src/app/retailer/retailer-items/retailer-item.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-item-element',
  templateUrl: './new-item-element.component.html',
  styleUrls: ['./new-item-element.component.css'],
  
})
export class NewItemElementComponent implements OnInit {

  @Input() item : Item;


  constructor(private http: HttpClient, private itemService:RetailerItemService) {
    
  }

  ngOnInit() {
  }
 
  onAdded(){
    this.itemService.itemSelected.emit(this.item);
    this.http.post('https://vinora-dc8a2.firebaseio.com/Retailer/Selected-Items.json',this.item).subscribe((reponse: Response)=>{
      // console.log(reponse);
    })
    // this.itemService.addSelectedItems(this.item);
  }

}   
