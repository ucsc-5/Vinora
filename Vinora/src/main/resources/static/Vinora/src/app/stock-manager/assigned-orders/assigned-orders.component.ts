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
   }

  ngOnInit() {
    this.salesRepresentatives=this.salesRepService.getSalesRepByCompanyId(this.companyId);
  }


  select(saleRepId:string){
    console.log("This is the rep Id "+saleRepId);
    this.saleRepId=saleRepId;
  }


}
