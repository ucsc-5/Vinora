import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/app/item/item.model';

// import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  itemSelected = new EventEmitter<Item>();

  constructor(private http: HttpClient) { }

  private items: Item[] = [ new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new')]
  

  storeNewItem(item:Item){
    return this.http.post('https://vinora-dc8a2.firebaseio.com/items.json',item);
  }

  // getItem(){
  //   return this.http.get<Item[]>('https://vinora-dc8a2.firebaseio.com/items.json');
  
  // }

  getItem(){
    return this.items.slice();
  }


}
