import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';
import { from, Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Items{
  barnd:string;
  itemName:string;
  category:string;
  quantity:string;
  url:string;
  unitPrice:string;
  state:string;
}
@Component({
  selector: 'app-update-item-element',
  templateUrl: './update-item-element.component.html',
  styleUrls: ['./update-item-element.component.css']
})

export class UpdateItemElementComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Items>;
  items: Observable<Items>;


  constructor(private itemServise:ItemService,private afs: AngularFirestore,private afAuth: AngularFireAuth) { }

  ngAfterViewInit(){
   var userId= this.afAuth.auth.currentUser.uid;

    console.log(this.afs.collection('salesRepresentatives'));
  // console.log(this.itemDoc.collection<SalesRepresentative>('salesRepresentatives').valueChanges());
    
  }

  ngOnInit() {
  }

  updateQuantity(form:NgForm) {
    const value=form.value;

    // console.log(value.quantity);
    // console.log(this.item.key);
    // const newQuantity= this.item.quantity+value.quantity;
    // this.itemServise.updateItem(this.item.key, {quantity: newQuantity})
    //   .catch(err => console.log(err+"jkdcjdscjsdbc"));
  }




}
