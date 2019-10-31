import { Component, OnInit, Input } from '@angular/core';
import {  CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { ItemService, ItemId } from 'src/app/service/item.service';

@Component({
  selector: 'app-reg-item-element',
  templateUrl: './reg-item-element.component.html',
  styleUrls: ['./reg-item-element.component.css']
})
export class RegItemElementComponent implements OnInit {

  @Input() item:ItemId

  message: any;

  constructor(private itemService:ItemService, private afAuth: AngularFireAuth) {
 
  }

  ngOnInit() {

  }

  onRemove(){
      
    this.message = this.itemService.updateItem(this.item.id,{state: "deleted"}).then(
      x=>{
        return "done";
      }
    ).catch(
      error=>{error}
    )

    console.log(this.message);

  }

  OnUpdateUnitPrice(form:NgForm) {
      const value=form.value;
      console.log(value.unitPrice+"skjdbcjsdbc");
      console.log(this.item.id);
      
      this.message = this.itemService.updateItem(this.item.id,{unitPrice: value.unitPrice}).then(
        x=>{
          return "done";
        }
      ).catch(
        error=>{error}
      )
  
      console.log(this.message);
      //   .catch(err => console.log(err+"jkdcjdscjsdbc"));
    }
  

  

}
