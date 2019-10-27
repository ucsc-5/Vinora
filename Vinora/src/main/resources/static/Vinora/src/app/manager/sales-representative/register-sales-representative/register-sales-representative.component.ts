import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

export interface SalesRepresentative{
  fullName:string;
  address:string;
  email:string;
  mobile:number;
  itemImagePath: string;
  nic:string;
  state: string;

}

@Component({
  selector: 'app-register-sales-representative',
  templateUrl: './register-sales-representative.component.html',
  styleUrls: ['./register-sales-representative.component.css']
})
export class RegisterSalesRepresentativeComponent implements OnInit {

  itemImage: FileList;

  private salesRepresentativeCollection: AngularFirestoreCollection<SalesRepresentative>;
  salesRepresentatives: Observable<SalesRepresentative[]>;
  managerId;


  constructor(private afAuth: AngularFireAuth,private readonly afs: AngularFirestore,private fns: AngularFireFunctions,private storage: AngularFireStorage) {
    this.managerId= this.afAuth.auth.currentUser.uid;
    this.salesRepresentativeCollection = afs.collection<SalesRepresentative>(`companies/${this.managerId}/salesRepresentatives`);

  }

  ngOnInit() {
  }



  onAddSalesrepresentative(form: NgForm){
    const value = form.value;
    const fullName = value.fullName;
    const address = value.address;
    const email = value.email;
    const mobile = value.mobile;
    const nic = value.nic;
    const itemImage = this.itemImage.item(0); 

    const state = value.state;
   
    const basePath ="salesRepresentatives"

    const filePath = `${basePath}/${itemImage.name}${new Date()}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath,itemImage);
   
   




      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            console.log(downloadURL);
             const itemImagePath= downloadURL;
             const id = this.afs.createId();
             const salesrepresentative:SalesRepresentative = {fullName,address,email,mobile,nic,itemImagePath,state};
             console.log(salesrepresentative);
             this.salesRepresentativeCollection.doc(id).set(salesrepresentative);
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

}
