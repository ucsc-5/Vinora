import { Component, OnInit, Input,ElementRef, ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { RetailerService, Retailer, RetailerId } from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { OrderId,OrderService } from 'src/app/service/order.service';
import { CartItemId } from 'src/app/service/cart.service';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-retailer-orders-for-stm',
  templateUrl: './retailer-orders-for-stm.component.html',
  styleUrls: ['./retailer-orders-for-stm.component.css']
})
export class RetailerOrdersForSTMComponent implements OnInit {
  @ViewChild('content',{ static: true }) content:ElementRef;
  @Input() order: OrderId
  items: Observable<CartItemId[]>

  constructor(private router:Router,private route:ActivatedRoute,private retailerService:RetailerService,private orderService:OrderService) { 

  }

  ngOnInit() {
    // console.log(this.order.id+" this is the retailer Id");
    this.items = this.orderService.getItemsByOrderId(this.order.id);      
  }

  public downloadPdf(){

    let doc = new jsPDF();
    let specialElementHandlers={
      '#editor' :function(element,renderer) {
        return true;
        
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('report.pdf');
  }

}