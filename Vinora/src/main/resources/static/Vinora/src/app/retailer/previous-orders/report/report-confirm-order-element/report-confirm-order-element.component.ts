import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId, OrderService } from 'src/app/service/order.service';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { CartItem } from 'src/app/service/cart.service';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-report-confirm-order-element',
  templateUrl: './report-confirm-order-element.component.html',
  styleUrls: ['./report-confirm-order-element.component.css']
})
export class ReportConfirmOrderElementComponent implements OnInit {

  @Input() confirmOrder: OrderId;
  company:Observable<CompanyId[]>;
  items:Observable<CartItem[]>;

  constructor(private companyService: CompanyService,private orderService:OrderService,private reportService:ReportService) { }

  ngOnInit() {

    console.log(this.confirmOrder.createDate);
    
    this.company = this.companyService.getCompanyById(this.confirmOrder.companyId);
    this.items = this.orderService.getItemsByOrderId(this.confirmOrder.id);
    // this.reportService.getDate(this.confirmOrder.createDate);
  
  }

}
