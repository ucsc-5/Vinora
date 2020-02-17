import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId, OrderService,Order } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { CartItemId, CartService } from 'src/app/service/cart.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-retailer-delivered-orders',
  templateUrl: './retailer-delivered-orders.component.html',
  styleUrls: ['./retailer-delivered-orders.component.css']
})
export class RetailerDeliveredOrdersComponent implements OnInit {

  @ViewChild('content1',{ static: true }) content1:ElementRef;
  deliveredOrders:Observable<OrderId[]>;
  retailerId:string;

  constructor(private afs: AngularFirestore,private afAuth: AngularFireAuth,private orderService:OrderService,private companyService:CompanyService,private cartService:CartService) {
   
   }

  ngOnInit() {
    this.retailerId= this.afAuth.auth.currentUser.uid;

    this.deliveredOrders=this.afs.collection('orders',ref=>ref.where('retailerId','==',this.retailerId).where('state','==',1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  requestedDownloadPdf(){
    console.log("Report Generated");
      

    let doc = new jsPDF();
    let specialElementHandlers={
      '#editor' :function(element,renderer) {
        return true;
        
      }
    };
    let content1 = this.content1.nativeElement;
    doc.fromHTML(content1.innerHTML,20,20,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('report.pdf');  
  }

}
