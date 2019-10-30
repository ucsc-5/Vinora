import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SalesRepresentative{
  fullName:string;
  address:string;
  email:string;
  contactNumber:number;
  imagePath: string;
  nic:string;
  state: string;
  companyId: string;
  
}

export interface SalesRepresentativeId extends SalesRepresentative{
  id: string;
}


@Injectable({
  providedIn: 'root'
})
export class SalesRepresentativeService {
  salesrepresentatives: Observable<SalesRepresentativeId[]>;

  dbPath="salesRepresentatives";

  constructor(private afs: AngularFirestore) { }

  getSalesRepByEmail(email:string){

    this.salesrepresentatives = this.afs.collection(this.dbPath , ref => ref.where('email','==',email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SalesRepresentative;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
  
    return this.salesrepresentatives;
  }
}
