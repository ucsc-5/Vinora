import { Injectable, Input } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Retailer } from './retailer.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { finalize, switchMap, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


export interface Reatiler { shopName: string;
                            email: string;
                            address: string;
                            contactNumber: string;
                            state: string;
                            userId: string;
                            key: string;
                            url: string;                         
}

 
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
 


  dbPath = 'retailers'
  // currentRetailerId;
  
  retailer: Observable<Reatiler[]>;

  private retailerCollection: AngularFirestoreCollection<Reatiler>;


  constructor(private storage: AngularFireStorage,private readonly afs: AngularFirestore,private afAuth: AngularFireAuth) {
    
    this.retailerCollection = afs.collection<Reatiler>('retailers');
    //  this.currentRetailerId = this.afAuth.auth.currentUser.uid;
  }
 

// createRetailer(retailer2:Retailer,uid:string) {
//   console.log(uid+" from the service here");
//   const basePath = this.dbPath
//   const filePath = `${basePath}/${retailer2.file.name}${new Date()}`;
//   const storageRef = this.storage.ref(filePath);
//   const uploadTask = this.storage.upload(filePath,retailer2.file);

//   uploadTask.snapshotChanges().pipe(
//     finalize(() => {
//       storageRef.getDownloadURL().subscribe(downloadURL => {
//         console.log('File available at', downloadURL);
          
//           // this.retailerCollection.add(retailer);
        

//       });
//     })
//   ).subscribe();

//          const shopname11: string = retailer2.shopName
//           const id = this.afs.createId();
//           // const retailer1: Reatiler10 = {shopname11,shopname11,shopname11,shopname11};
//           //this.retailerCollection.doc(id).set(retailer1);

//   return uploadTask.percentageChanges();
// }

getRetailer(uid:string){
  
  this.retailer =this.afs.collection(this.dbPath , ref => ref.where('id', '==',uid)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Reatiler;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );

  return this.retailer;
}
  
}