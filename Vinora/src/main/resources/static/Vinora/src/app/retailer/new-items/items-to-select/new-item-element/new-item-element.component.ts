
import { Item } from 'src/app/service/item.model';

import { Input, OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-item-element',
  templateUrl: './new-item-element.component.html',
  styleUrls: ['./new-item-element.component.css'],
  
})
export class NewItemElementComponent implements OnInit {

  @Input() item : Item;


  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
  
  }
 
  onAdded(){
  }

}   
