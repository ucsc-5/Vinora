import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from 'src/app/service/order.model';
import { OrderService } from 'src/app/service/order.service';
import { Item } from 'src/app/service/item.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService } from 'src/app/service/retailer.service';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {


  companyKeys$: Observable<any>;
  retailerId
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private retailerService:RetailerService) {
    this.retailerId = this.afAuth.auth.currentUser.uid;
  }
  ngOnInit() {
    // this.companyKeys$=this.retailerService.getRegisteredCompaniesList(this.retailerId);
  }
  
  onItemToCart(item:Item){
    console.log(item);
  }

}
