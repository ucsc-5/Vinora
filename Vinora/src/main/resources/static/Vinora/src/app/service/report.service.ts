import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


export interface Order{
  createDate : Date; 
  retailerId: string;
  companyId: string;
  total: number;
  state: number;
  tempTotal: number;
  saleRepId: string;
  stockManagerId: string;
  date: number;
  month: number;
  year: number;
  encDate: number;
  saleRepAccept: number;
}





export interface OrderId extends Order{
  id: string;
}



@Injectable({
  providedIn: 'root'
})
export class ReportService {

  createDate : Date;
  constructor(private afs:AngularFirestore) { 

  }



  getreportdetails(companyId:string){

  }
  getreportByDate(fromDate:Date,toDate:Date){
    console.log("fromDate"+fromDate);
    console.log("toDate"+toDate);
 
    // this.afs.collection('orders', ref => ref
    //     .where('dueDate', '>', fromDate)
    //     .where('dueDate', '<', toDate)
    // );

    // const currentOordersByCompany:Observable<OrderId[]> = this.afs.collection('/orders', ref => ref.where('companyId','==',companyId).where('state','==',-1).where('retailerId','==',retailerId)).snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Order;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
    // return currentOordersByCompany;
   

   

  }
  getDate(date:Date){
        this.createDate = date;
  }
}
