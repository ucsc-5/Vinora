import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderId } from './order.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  createDate : string;
  constructor(private afs:AngularFirestore) { 

  }



  getreportdetails(companyId:string){

  }
  getreportByDate(fromDate:Date,toDate:Date){
    console.log("fromDate"+fromDate);
    console.log("Hashiniiii"+this.createDate);
   

    // this.items = this.afs.collection('orders').doc(orderKey).collection('items').snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as CartItem;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
    // return this.items;

  }
  getDate(date:string){
        this.createDate = date;
  }
}
