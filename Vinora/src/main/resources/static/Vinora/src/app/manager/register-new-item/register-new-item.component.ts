import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/service/item.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { ItemService } from 'src/app/service/item.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyService } from 'src/app/service/company.service';
@Component({
  selector: 'app-register-new-item',
  templateUrl: './register-new-item.component.html',
  styleUrls: ['./register-new-item.component.css']
})
export class RegisterNewItemComponent implements OnInit {

  itemImage: FileList;
  brandImage: FileList;

  managerId;
 
  constructor(private itemService:ItemService,private route: Router,private afAuth: AngularFireAuth,private companyService:CompanyService) {
    this.managerId= this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
    
  }

  onAddItem(form: NgForm){
      const value = form.value;
      const item = new Item(value.itemName,value.brandName,value.description,value.quantity,value.unitPrice,value.state);
      const itemImage = this.itemImage.item(0);
      const brandImage = this.brandImage.item(0);
      item.setFile(itemImage,brandImage);      
      // this.companyService.createItem(item,this.managerId);
    }

    selectItemImage(event) {
      this.itemImage = event.target.files;
    }

    selectBrandImage(event) {
      this.brandImage = event.target.files;
    }   

}
