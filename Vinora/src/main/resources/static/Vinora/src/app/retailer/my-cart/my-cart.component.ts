import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {


  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase, private orderService:OrderService) {
        this.itemsRef = db.list('orders');
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );

      }

  ngOnInit() {
  }

}
