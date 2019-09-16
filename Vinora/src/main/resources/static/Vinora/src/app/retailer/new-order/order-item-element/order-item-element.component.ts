import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item/item.model';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-order-item-element',
  templateUrl: './order-item-element.component.html',
  styleUrls: ['./order-item-element.component.css']
})
export class OrderItemElementComponent implements OnInit {

  @Input()  item :Item
  constructor(private db:AngularFireDatabase) { }


  ngOnInit() {
  }

  onDelete(item:Item){
    const itemRef = this.db.object('item');
    itemRef.remove();
  }

}
