import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-retailer-dashboard-for-stm',
  templateUrl: './retailer-dashboard-for-stm.component.html',
  styleUrls: ['./retailer-dashboard-for-stm.component.css']
})
export class RetailerDashboardForSTMComponent implements OnInit {

  retailerId: string;
  retailer: Observable<RetailerId[]>;
  currentOrders: Observable<OrderId[]>;
  confirmedOrders: Observable<OrderId[]>;
  deleveredOrders: Observable<OrderId[]>;

  latitude = 6.902196;
  longitude = 79.861133;

  purches = false;
  confirmed = false;
  assigned = false;
  delivered = false;
  profile = true;

  companyId

  constructor(private afAuth: AngularFireAuth,private router:Router,private route:ActivatedRoute,private retailerService:RetailerService,private orderService:OrderService) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId;
    })

   }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
    this.retailerId = param['retailerId'];})
    this.retailer = this.retailerService.getRetailerById(this.retailerId);
    this.currentOrders = this.orderService.getCurrentOrdersByRetailerIdCompanyId(this.companyId,this.retailerId);
    this.confirmedOrders = this.orderService.getConfirmedOrdersByRetaiilerIdCompanyId(this.companyId,this.retailerId);
    // this.assignedOrders = this.orderService.getAssignedOrdersByRetailerIdCompanyId(this.companyId,this.retailerId);
    this.deleveredOrders = this.orderService.getDeleveredOrdersByRetailerIdCompanyId(this.companyId,this.retailerId);
    
  }


  onProfile(){
    this.purches = false;
    this.confirmed = false;
    this.assigned = false;
    this.delivered = false;
    this.profile = true;
  }

  onPurches(){
    this.purches = true;
    this.confirmed = false;
    this.assigned = false;
    this.delivered = false;
    this.profile = false;
  }

  onConfirmed(){
    this.purches = false;
    this.confirmed = true;
    this.assigned = false;
    this.delivered = false;
    this.profile = false;
  }

  onAssigned(){
    this.purches = false;
    this.confirmed = false;
    this.assigned = true;
    this.delivered = false;
    this.profile = false;

  }

  onDelivered(){
    this.purches = false;
    this.confirmed = false;
    this.assigned = false;
    this.delivered = true;
    this.profile = false;
  }
}
