import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

export interface StockManager{
  fullName:string;
  address:string;
  nic:string;
  email:string;
  mobile:string;
  state:string;
  companyId:string;
}

@Component({
  selector: 'app-register-stock-manager',
  templateUrl: './register-stock-manager.component.html',
  styleUrls: ['./register-stock-manager.component.css']
})
export class RegisterStockManagerComponent implements OnInit {
  fullName=new FormControl('', [Validators.required]);
  address=new FormControl('', [Validators.required]);
  nic=new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile=new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
  private stockManagerCollection: AngularFirestoreCollection<StockManager>;
  stockManagers: Observable<StockManager[]>;
  type = 'stockManager';
  constructor(private afAuth: AngularFireAuth,private readonly afs: AngularFirestore,private fns: AngularFireFunctions) { 
    const companyId=this.afAuth.auth.currentUser.uid;
    this.stockManagerCollection = afs.collection<StockManager>(`companies/${companyId}/stockManagers`);
    this.stockManagers= this.stockManagerCollection.valueChanges();
  }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  async register(){
    const companyId=this.afAuth.auth.currentUser.uid;
    const fullName:string=this.fullName.value;
    const address:string=this.address.value;
    const nic:string=this.nic.value;
    const email:string=this.email.value;
    const mobile:string=this.mobile.value;
    const state:string="1";
    const stockManager1:StockManager={fullName,address,nic,email,mobile,state,companyId}
    const callable = await this.fns.httpsCallable('addRole');
    var createUser=this.afAuth.auth.createUserWithEmailAndPassword(this.email.value,this.nic.value);
    callable({email:email,role:this.type}).subscribe(
      (response)=>{
           console.log(response);
      },
      ()=>{},
      ()=>{
        createUser.then( (data)=>{
          this.stockManagerCollection.doc(data.user.uid).set(stockManager1);
        });
   }
  )
    
    
    
  }

}
