import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesRepresentativeId, SalesRepresentativeService } from 'src/app/service/sales-representative.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { OrderId,OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.css']
})
export class AssignedOrdersComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  salesRepresentatives: Observable<SalesRepresentativeId[]>
  companyId: string;
  orders: Observable<OrderId[]>;
  saleRepId: string

  constructor(private afAuth: AngularFireAuth,private salesRepService:SalesRepresentativeService,private orderService:OrderService) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId.cmpId;
    })
    this.saleRepId=this.afAuth.auth.currentUser.uid
   }

  ngOnInit() {
    this.salesRepresentatives=this.salesRepService.getSalesRepByCompanyId(this.companyId);

    console.log(this.companyId+" company id");
    console.log(this.saleRepId+ " saleRep iD");
    console.log("this is the assign")
    
  }


  select(saleRepId:string){
    console.log("This is the rep Id "+saleRepId);
    this.saleRepId=saleRepId;
    this.orders= this.orderService.getAssignedOrdersByCompanyIdSaleRepId(this.companyId,this.saleRepId);

    this.orders.forEach(
      x=>{
        console.log(x);
        console.log("inside the foreach function");
      }
    )

  }


}
