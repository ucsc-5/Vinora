import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { ItemService, Item, ItemId } from 'src/app/service/item.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-register-new-item',
  templateUrl: './register-new-item.component.html',
  styleUrls: ['./register-new-item.component.css']
})
export class RegisterNewItemComponent implements OnInit {

  itemImage: FileList;
  type = 'option2';


  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<ItemId[]>;

  managerId;
 
  constructor(private afs: AngularFirestore,private itemService:ItemService,private route: Router,private afAuth: AngularFireAuth,private companyService:CompanyService,private storage: AngularFireStorage) {
    this.managerId= this.afAuth.auth.currentUser.uid;
    this.itemsCollection = afs.collection<Item>(`items`);
  }


  ngOnInit() {
    
  }

  onAddItem(form: NgForm){
      const value = form.value;
      // const item = new Item(value.itemName,value.brandName,value.description,value.quantity,value.unitPrice,value.state);

      const itemName = value.itemName;
      const brand = value.brandName;
      const quantity = 0;
      const unitPrice = value.unitPrice;
      const companyId =  this.managerId;
      // const itemImagePath = value.itemImagePath
      // const brandImagePath: string;
      const description = value.description;
      const category = "category";
      const state = "active";
      const itemImage = this.itemImage.item(0);  
      const type= this.type;              
      
      const basePath ="items"
      const filePath = `${basePath}/${itemImage.name}${new Date()}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath,itemImage);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            console.log(downloadURL);
             const itemImagePath= downloadURL;
             const id = this.afs.createId();
             const item:Item = {itemName,brand,quantity,unitPrice,itemImagePath,description,category,state,companyId,type};
             console.log(item);
             this.itemsCollection.doc(id).set(item);
          });
        })
        ).subscribe(
          res=>{
            console.log(res)
          }
        )
    }

    selectItemImage(event) {
      this.itemImage = event.target.files;
    }

    // selectBrandImage(event) {
    //   this.brandImage = event.target.files;
    // }   

}
