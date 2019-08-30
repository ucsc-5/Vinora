import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';

@Component({
  selector: 'app-register-new-item',
  templateUrl: './register-new-item.component.html',
  styleUrls: ['./register-new-item.component.css']
})
export class RegisterNewItemComponent implements OnInit {

 
  

  constructor(private itemService: ItemServiceService) {
   }

  ngOnInit() {
    
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const item = new Item();
    item.newItem(1,value.itemName,value.brandName,'',value.itemImage,value.brandImage,value.quantity,value.unitPrice,'new' );
    this.itemService.storeNewItem(item).subscribe(
      (response)=> console.log(response),
      (error) => console.log(error)
    )  
  }

 

}
