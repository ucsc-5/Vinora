import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService, Item, ItemId } from 'src/app/service/item.service';
import { from, Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { StockManager } from 'src/app/service/stock-manager.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-update-item-element',
  templateUrl: './update-item-element.component.html',
  styleUrls: ['./update-item-element.component.css']
})

export class UpdateItemElementComponent implements OnInit {
  @Input() item: ItemId;

  message: any;

  constructor(private dialogService:DialogService,private itemServise:ItemService,private afs: AngularFirestore,private afAuth: AngularFireAuth) { 
   }

  ngOnInit() {
  }

  updateQuantity(form:NgForm) {
    const value=form.value;
    const newQuantity= this.item.quantity+value.quantity;
    const message="Confrim"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.message = this.itemServise.updateItem(this.item.id,{quantity: newQuantity}).then(
            x=>{
              return "Update is done";
            }
          ).catch(
            error=>{error}
          )
        }
      }
    );

  

    console.log(this.message);
    
  }




}
