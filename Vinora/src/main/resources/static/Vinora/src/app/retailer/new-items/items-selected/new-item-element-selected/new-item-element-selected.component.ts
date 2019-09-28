import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/service/item.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-item-element-selected',
  templateUrl: './new-item-element-selected.component.html',
  styleUrls: ['./new-item-element-selected.component.css']
})
export class NewItemElementSelectedComponent implements OnInit {

  @Input()
  item : Item;



   constructor( private http:HttpClient) {
   
  }

ngOnInit() {

}

}
