import { Component, OnInit } from '@angular/core';
import { OrderItem, ItemService, Item } from 'src/app/service/item.service';
import { OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.css']
})
export class OrderSummeryComponent implements OnInit {
  orderItems:Observable<OrderItem[]>;
  companyId:string;
  mailUrl = "https://us-central1-vinora-dc8a2.cloudfunctions.net/retailerRemoveItems";


  constructor(private http: HttpClient,private fns: AngularFireFunctions,private itemService:ItemService ,private orderService:OrderService, private route:ActivatedRoute,private afs: AngularFirestore) { }


  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
    this.orderItems= this.orderService.getItemsFromOrderByCompanyId(this.companyId);
  } 

  async onRemove(item:OrderItem){

    // this.http.post(this.mailUrl,item.quantity).subscribe(res=>{
    //   console.log(res);
    // })

    const callable = await this.fns.httpsCallable('addRole');

    callable({quantity: item.quantity}).subscribe(
      (response)=>{
           console.log(response);
      });

  }
}
