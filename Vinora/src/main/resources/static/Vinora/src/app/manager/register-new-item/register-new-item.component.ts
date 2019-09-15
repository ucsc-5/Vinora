import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/item/item.model';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-new-item',
  templateUrl: './register-new-item.component.html',
  styleUrls: ['./register-new-item.component.css']
})
export class RegisterNewItemComponent implements OnInit {

  selectedItemImage:File = null;

  constructor(private itemService: ItemServiceService,private route: Router) {
   }

   onFileSelected(event){
    this.selectedItemImage= <File>event.target.files[0];
    
  }
   

  ngOnInit() {
    
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const item = new Item(1,value.itemName,value.brandName,value.description,this.selectedItemImage,value.brandImage,value.quantity,value.unitPrice,'new' );
    this.itemService.storeNewItem(item,this.selectedItemImage).subscribe(
      (response)=> console.log(response),
      (error) => console.log(error)
    )  
    // const value = form.value;
    // const newItem = new Item(value.id,value.itemName,value.brandName,value.description,value.itemImage,value.brandImage,value.quantity,value.unitPrice,value.state);
    // console.log(newItem);
    // this.itemService.itemSelected.emit(newItem);
    // this.itemService.addNewItem(newItem);
    // // console.log(this.itemService.getItem);
  }



 

}
