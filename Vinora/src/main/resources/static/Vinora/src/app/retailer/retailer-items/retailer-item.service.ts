import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/app/item/item.model';

@Injectable({
  providedIn: 'root'
})
export class RetailerItemService {

  itemSelected = new EventEmitter<Item>();

  constructor(private http: HttpClient) { }

  // private toSelectItems: Item[] = [ new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  // new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new'),
  // new Item(1,'first Item','first Brand','The discription here','http://2.bp.blogspot.com/-1-LqHgUvJN4/Vm122nf8VRI/AAAAAAAAAEA/FyO4TcIr36M/s1600/masoor%2Bdal%2Bbenefits.png','https://www.unilever.com/Images/heartbrand_tcm244-408761.gif',1000,40.00,'new')]

  
    private toSelectItems: Item[] = [ new Item(1,'first Item','first Brand','The discription here',1000,40.00,'new'),
  new Item(1,'first Item','first Brand','The discription here',1000,40.00,'new'),
  new Item(1,'first Item','first Brand','The discription here',1000,40.00,'new')]


  private selectedItems: Item[] = [];
  

  getRetailerItemsToSelect(){
    return this.toSelectItems;
  }

  getRetailerItemsSelected(){
    return this.selectedItems;
  }

  addSelectedItems(item: Item){
    this.selectedItems.push(item);
  }

  getRetailerSelectedItem(){
    return this.itemSelected.subscribe((item:Item)=>{ return item});
  }

}
