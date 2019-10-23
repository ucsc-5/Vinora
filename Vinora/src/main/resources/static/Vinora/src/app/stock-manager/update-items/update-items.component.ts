import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { ItemService } from 'src/app/service/item.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Items>;
  items: Observable<Items>;
  
  constructor(db: AngularFireDatabase,private afs: AngularFirestore,private afAuth: AngularFireAuth) {

    
  }
  ngAfterViewInit(){
    var email= this.afAuth.auth.currentUser.email;
    this.afs.collectionGroup('salesRepresentatives');
     console.log(this.afs.collectionGroup('salesRepresentatives',ref=>ref.where('email','==',email)).get);
   // console.log(this.itemDoc.collection<SalesRepresentative>('salesRepresentatives').valueChanges());
     
   }
  ngOnInit() {
  }

  
  }

