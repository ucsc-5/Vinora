import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

export interface SalesRepresentative{
  fullName:string;
  address:string;
  nic:string;
  email:string;
  mobile:string;
  state:string;
}

@Component({
  selector: 'app-register-sales-representative',
  templateUrl: './register-sales-representative.component.html',
  styleUrls: ['./register-sales-representative.component.css']
})
export class RegisterSalesRepresentativeComponent implements OnInit {

  fullName=new FormControl('', [Validators.required]);
  address=new FormControl('', [Validators.required]);
  nic=new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile=new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
  private salesRepresentativeCollection: AngularFirestoreCollection<SalesRepresentative>;
  salesRepresentatives: Observable<SalesRepresentative[]>;
  type = 'salesRepresentative';

  constructor(private afAuth: AngularFireAuth,private readonly afs: AngularFirestore,private fns: AngularFireFunctions) {

    const uid=this.afAuth.auth.currentUser.uid;
    this.salesRepresentativeCollection = afs.collection<SalesRepresentative>(`companies/${uid}/salesRepresentatives`);
    this.salesRepresentatives= this.salesRepresentativeCollection.valueChanges();
  }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  async register(){
    const fullName:string=this.fullName.value;
    const address:string=this.address.value;
    const nic:string=this.nic.value;
    const email:string=this.email.value;
    const mobile:string=this.mobile.value;
    const state:string="1";
    const salesRepresentative1:SalesRepresentative={fullName,address,nic,email,mobile,state}
    const callable = await this.fns.httpsCallable('addRole');
    var createUser=this.afAuth.auth.createUserWithEmailAndPassword(this.email.value,this.nic.value);
    callable({email:email,role:this.type}).subscribe(
      (response)=>{
           console.log(response);
      },
      ()=>{},
      ()=>{
        createUser.then( (data)=>{
          this.salesRepresentativeCollection.doc(data.user.uid).set(salesRepresentative1);
        });
   }
  )
    
    
    
  }

}
