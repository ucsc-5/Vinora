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

  selectedItemImage:File = null;
  managerId;
 
  constructor(private itemService:ItemService,private route: Router,private afAuth: AngularFireAuth,private companyService:CompanyService) {
    this.managerId= this.afAuth.auth.currentUser.uid;
   }

   onFileSelected(event){
    this.selectedItemImage= <File>event.target.files[0];
  }
   

  ngOnInit() {
    
  }

  onAddItem(form: NgForm){
      const value = form.value;
      const item = new Item(value.itemName,value.brandName,value.description,value.quantity,value.unitPrice,value.state);
      this.companyService.createItem(item,this.managerId);
    }

}
