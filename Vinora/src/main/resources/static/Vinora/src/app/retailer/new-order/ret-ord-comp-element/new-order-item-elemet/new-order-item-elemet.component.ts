import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';
import { CompanyService, ItemsId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-order-item-elemet',
  templateUrl: './new-order-item-elemet.component.html',
  styleUrls: ['./new-order-item-elemet.component.css']
})
export class NewOrderItemElemetComponent implements OnInit {

  @Input() companyUid: string;

  items : Observable<ItemsId[]>

  constructor(private companyService: CompanyService) { }

  ngOnInit() {

    this.items = this.companyService.getItems(this.companyUid);

    this.items.forEach(x=>{
      console.log(x);
    })
    console.log("form the item elements");
  }

  toCart(form: NgForm){

    }
  
  }