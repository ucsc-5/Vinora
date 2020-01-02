import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SalesRepresentative{
  fullName:string;
  address:string;
  email:string;
  contactNumber:number;
  salesRefImagePath: string;
  nic:string;
  state: string;
  companyId: string;
  saleRepId: string;
  saleRepAccept: number;
  
}

export interface SalesRepresentativeId extends SalesRepresentative{
  id: string;
}


@Injectable({
  providedIn: 'root'
})
export class SalesRepresentativeService {
  salesrepresentative: Observable<SalesRepresentativeId[]>;

  dbPath="salesRepresentatives";

  constructor(private afs: AngularFirestore) { }

  getSalesRepByEmail(email:string){

    this.salesrepresentative = this.afs.collection(this.dbPath , ref => ref.where('email','==',email).limit(1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SalesRepresentative;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
    return this.salesrepresentative;
  }

  getSalesRepByCompanyId(companyId:string){
    const  salesrepresentatives: Observable<SalesRepresentativeId[]> = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SalesRepresentative;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return salesrepresentatives;
  }
}
