import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService, ItemId } from 'src/app/service/item.service';
import { CompanyService} from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-order-item-elemet',
  templateUrl: './new-order-item-elemet.component.html',
  styleUrls: ['./new-order-item-elemet.component.css']
})
export class NewOrderItemElemetComponent implements OnInit {

  @Input() companyUid: string;

  items : Observable<ItemId[]>

  constructor(private itemService:ItemService) { }

  ngOnInit() {

    this.items = this.itemService.getItemsByCompanyId(this.companyUid);

    this.items.forEach(x=>{
      console.log(x);
    })
    console.log("form the item elements");
  }

  toCart(form: NgForm){

    }
  
  }