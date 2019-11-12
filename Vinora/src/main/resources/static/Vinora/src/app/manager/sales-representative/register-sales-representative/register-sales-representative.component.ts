import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { SalesRepresentative, SalesRepresentativeId } from 'src/app/service/sales-representative.service';




@Component({
  selector: 'app-register-sales-representative',
  templateUrl: './register-sales-representative.component.html',
  styleUrls: ['./register-sales-representative.component.css']
})
export class RegisterSalesRepresentativeComponent implements OnInit {

  itemImage: FileList;
  type="salesRef";

  private salesRepresentativeCollection: AngularFirestoreCollection<SalesRepresentative>;
  salesRepresentatives: Observable<SalesRepresentativeId[]>;
  companyId:string;


  constructor(private afAuth: AngularFireAuth,private readonly afs: AngularFirestore,private fns: AngularFireFunctions,private storage: AngularFireStorage) {
    this.companyId= this.afAuth.auth.currentUser.uid;

    this.salesRepresentativeCollection = afs.collection<SalesRepresentative>(`salesRepresentatives`);

  }

  ngOnInit() {

  }



  async onAddSalesrepresentative(form: NgForm){
    const value = form.value;
    const fullName = value.fullName;
    const address = value.address;
    const email = value.email;
    const contactNumber = value.contactNumber;
    const nic = value.nic;
    const companyId = this.companyId;
    const salesRefImagePath:string="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg";
    const state = "0";
   
    const id = this.afs.createId();

    const salesrepresentative:SalesRepresentative = {fullName,address,email,contactNumber,nic,salesRefImagePath,state,companyId};
    
    console.log(salesrepresentative);
    
    
    const callable = await this.fns.httpsCallable('addRole');
    var createUser=this.afAuth.auth.createUserWithEmailAndPassword(email,nic);
    callable({email:email,role:this.type,companyId:this.companyId}).subscribe(
      (response)=>{
           console.log(response);
      },
      ()=>{},
      ()=>{
        createUser.then( (data)=>{
          this.salesRepresentativeCollection.doc(id).set(salesrepresentative);
        });
   }
  ) 


   
             

  }

  selectItemImage(event) {
    this.itemImage = event.target.files;
  }

}
