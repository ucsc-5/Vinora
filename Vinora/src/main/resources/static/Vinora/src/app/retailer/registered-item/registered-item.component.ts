import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item/item.model';

@Component({
  selector: 'app-registered-item',
  templateUrl: './registered-item.component.html',
  styleUrls: ['./registered-item.component.css']
})
export class RegisteredItemComponent implements OnInit {

  items: Item[] = [ new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new')]

  constructor() { }

  ngOnInit() {
  }

}
