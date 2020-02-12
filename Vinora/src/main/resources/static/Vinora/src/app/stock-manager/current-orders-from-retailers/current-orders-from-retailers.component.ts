import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { StockManagerService, StockManagerId } from 'src/app/service/stock-manager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-orders-from-retailers',
  templateUrl: './current-orders-from-retailers.component.html',
  styleUrls: ['./current-orders-from-retailers.component.css']
})
export class CurrentOrdersFromRetailersComponent implements OnInit {

  companyId: string;
  orders: Observable<OrderId[]>;

  
  constructor(private afAuth: AngularFireAuth,private stockManagerService:StockManagerService,private orderService:OrderService,private router:Router,private route:ActivatedRoute) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      // console.log("This is the needed"+idTokenResult.claims.cmpId.cmpId);
      this.companyId= idTokenResult.claims.cmpId;
    })
  }

  ngOnInit() {
   this.orders= this.orderService.getCurrentOrdersByCompanyId(this.companyId);
  }

  onSearch(){
      this.router.navigate(['search'],{relativeTo: this.route})
  }

}
