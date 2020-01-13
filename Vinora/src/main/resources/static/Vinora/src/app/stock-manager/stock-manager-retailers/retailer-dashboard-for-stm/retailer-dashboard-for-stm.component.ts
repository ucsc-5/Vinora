import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';

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
  assignedOrders: Observable<OrderId[]>;

  latitude = 6.902196;
  longitude = 79.861133;

  purches = false;
  confirmed = false;
  assigned = false;
  delivered = false;
  profile = true;

  constructor(private router:Router,private route:ActivatedRoute,private retailerService:RetailerService,private orderService:OrderService) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
    this.retailerId = param['retailerId'];})
    this.retailer = this.retailerService.getRetailerById(this.retailerId);
    this.currentOrders = this.orderService.getCurrentOrdersByRetailerId(this.retailerId);
    this.confirmedOrders = this.orderService.getConfirmedOrdersByRetailerId(this.retailerId);
    this.assignedOrders = this.orderService.getAssignedOrdersByRetailerId(this.retailerId);
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
