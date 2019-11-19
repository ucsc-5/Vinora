import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { StockManagerId, StockManager } from 'src/app/service/stock-manager.service';
import { DialogService } from 'src/app/service/dialog.service';


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
  contactNumber=new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
  private stockManagerCollection: AngularFirestoreCollection<StockManager>;
  stockManagers: Observable<StockManagerId[]>;
  type = 'stockManager';
  companyId:string;

  constructor(private dialogService:DialogService,private afAuth: AngularFireAuth,private readonly afs: AngularFirestore,private fns: AngularFireFunctions) { 
    this.companyId=this.afAuth.auth.currentUser.uid;
    // this.stockManagerCollection = afs.collection<StockManager>(`companies/${companyId}/stockManagers`);  // for the chamods code
    this.stockManagerCollection = afs.collection<StockManager>('stockManagers');
    // this.stockManagers= this.stockManagerCollection.valueChanges();
  }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  // chamod implementations for registrations
  // async register(){
  //   const companyId=this.afAuth.auth.currentUser.uid;
  //   const fullName:string=this.fullName.value;
  //   const address:string=this.address.value;
  //   const nic:string=this.nic.value;
  //   const email:string=this.email.value;
  //   const mobile:string=this.mobile.value;
  //   const state:string="1";
  //   const stockManager1:StockManager={fullName,address,nic,email,mobile,state,companyId}
  //   const callable = await this.fns.httpsCallable('addRole');
  //   var createUser=this.afAuth.auth.createUserWithEmailAndPassword(this.email.value,this.nic.value);
  //   callable({email:email,role:this.type}).subscribe(
  //     (response)=>{
  //          console.log(response);
  //     },
  //     ()=>{},
  //     ()=>{
  //       createUser.then( (data)=>{
  //         this.stockManagerCollection.doc(data.user.uid).set(stockManager1);
  //       });
  //  }
  // ) 
    
  // }

    async register(){

      const message =" Confirm regsitration!"
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){

            const companyId=this.afAuth.auth.currentUser.uid;
            const fullName:string=this.fullName.value;
            const address:string=this.address.value;
            const nic:string=this.nic.value;
            const email:string=this.email.value;
            const contactNumber:string=this.contactNumber.value;
            const state:string="1";
            const imagePath:string="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg";
            const stockManager1:StockManager={fullName,address,nic,email,contactNumber,state,companyId,imagePath}
            const callable = this.fns.httpsCallable('addRole');
            var createUser=this.afAuth.auth.createUserWithEmailAndPassword(this.email.value,this.nic.value);
            callable({email:email,role:this.type,companyId:this.companyId}).subscribe(
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
        })   
  }

}
