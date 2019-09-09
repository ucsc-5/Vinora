import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item/item.model';

@Component({
  selector: 'app-registered-item',
  templateUrl: './registered-item.component.html',
  styleUrls: ['./registered-item.component.css']
})
export class RegisteredItemComponent implements OnInit {

  items: Item[] = [ new Item(1,'first Item','first Brand','The discription here The discription here The discription here','https://5.imimg.com/data5/MF/XV/MY-17000375/masoor-malka-500x500.jpg','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  new Item(2,'Second Item','second Brand','The discription here The discription here','https://5.imimg.com/data5/KA/GF/MY-17000375/masoor-sabut-500x500.jpg','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  new Item(3,'Third Item','third Brand','The discription here The discription here','http://shoorinternational.com/wp-content/uploads/2015/05/red-masoor-dal.jpg','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new')]
  
  constructor() { }

  ngOnInit() {
  }

}
