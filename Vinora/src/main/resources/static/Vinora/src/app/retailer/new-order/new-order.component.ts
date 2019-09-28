import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from 'src/app/service/order.model';
import { OrderService } from 'src/app/service/order.service';
import { Item } from 'src/app/service/item.model';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  currentOrder: Order;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private orderService:OrderService) {
    
    let date: Date = new Date();  
    this.currentOrder =  new Order(date); 
    console.log(this.currentOrder);
  }
  ngOnInit() {

    this.itemsRef = this.db.list('items');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  onItemToCart(item:Item){
    console.log(item);
    this.currentOrder.addItem(item);
    // console.log("sdjcjisdcjsndjcsdc");
    // console.log(this.currentOrder);
  }
}
