import { Component, OnInit } from '@angular/core';
import { ItemService,ItemId,Item} from 'src/app/service/item.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, Timestamp } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
export interface ReturnGoods{

  comment: string;
  companyId: string;
  companyName: string;
  items: Item;
  orderId: string;
  retailerId : string;
  returnGoodsQuantity: number;
  time: Date;

}

export interface ReturnGoodsId extends ReturnGoods{
  id:string;
}



@Component({
  selector: 'app-return-goods',
  templateUrl: './return-goods.component.html',
  styleUrls: ['./return-goods.component.css']
})
export class ReturnGoodsComponent implements OnInit {

  returnGoods:Observable<ReturnGoodsId[]>
  companyId: string
  constructor(private afs: AngularFirestore, private afAuth :AngularFireAuth) { 

    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      console.log(idTokenResult.claims.cmpId);
      this.companyId= idTokenResult.claims.cmpId;
      
    })

      this.returnGoods = this.afs.collection('returnGoods',ref=>ref.where('companyId','==',this.companyId)).snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as ReturnGoods;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     );

     this.returnGoods.subscribe(x=>{
       x.forEach(element=>{
         console.log(element);
       })
     })
  }

  ngOnInit() {
  }

}
