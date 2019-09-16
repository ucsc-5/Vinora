import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-items-selected',
  templateUrl: './items-selected.component.html',
  styleUrls: ['./items-selected.component.css']
  
})
export class ItemsSelectedComponent implements OnInit {

  @Input() item : Item;

  selectedItem: Item[];

  constructor(private http:HttpClient){

  }

  ngOnInit(){

    this.http.get('https://vinora-dc8a2.firebaseio.com/items.json').subscribe(
    (reponse:Response) =>{
      const newItems : any = reponse;
      // console.log(newItems);
      this.selectedItem=newItems;
      console.log(this.selectedItem);
      // console.log(newItems);
      // this.item= newItems;
    }
  )

  }

}
