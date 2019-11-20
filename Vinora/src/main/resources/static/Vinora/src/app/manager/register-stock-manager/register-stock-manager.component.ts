import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { StockManagerId, StockManager, StockManagerService } from 'src/app/service/stock-manager.service';
import { DialogService } from 'src/app/service/dialog.service';



@Component({
  selector: 'app-register-stock-manager',
  templateUrl: './register-stock-manager.component.html',
  styleUrls: ['./register-stock-manager.component.css']
})
export class RegisterStockManagerComponent implements OnInit {



  // fullName=new FormControl('', [Validators.required]);
  // address=new FormControl('', [Validators.required]);
  // nic=new FormControl('', [Validators.required]);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // contactNumber=new FormControl('', [Validators.required,Validators.minLength(9),Validators.maxLength(9),this.forbiddenContactNumbersValidator.bind(this)]);
  frobiddenContactNumbers: Array<string> = ['000000000','0000000000'];

  registerForm: FormGroup
  
  
  private stockManagerCollection: AngularFirestoreCollection<StockManager>;
  stockManagers: Observable<StockManagerId[]>;
  type = 'stockManager';
  valid = false;




  companyId:string;
  
  message

  constructor(private stockManagerService:StockManagerService,private dialogService:DialogService,private afAuth: AngularFireAuth,private readonly afs: AngularFirestore,private fns: AngularFireFunctions) { 
    this.companyId=this.afAuth.auth.currentUser.uid;
    // this.stockManagerCollection = afs.collection<StockManager>(`companies/${companyId}/stockManagers`);  // for the chamods code
    this.stockManagerCollection = afs.collection<StockManager>('stockManagers');
  }

  ngOnInit() {
    this.stockManagers = this.stockManagerService.getActiveStockManagerByCompanyId(this.companyId);

    let numericRegex = /^[0-9]+$/;

    let nicRanger = /^[vV0-9]+$/;
    // '[6-9]\\d{9}'

    this.registerForm = new FormGroup({
      'fullName': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'address': new FormControl(null, Validators.required),
      'nic' : new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern(nicRanger)]),
      'contactNumber' : new FormControl(null,[Validators.required,Validators.minLength(9),Validators.maxLength(9),this.forbiddenContactNumbersValidator.bind(this),Validators.pattern(numericRegex)])
    });

    this.registerForm.statusChanges.subscribe(state=>{
      console.log(state);
      
      if(state=="VALID"){
        this.valid=true;
      }else{
        this.valid=false;
      }
    })



  }

  forbiddenContactNumbersValidator(control: FormControl):{[s:string]: boolean}{
    if(this.frobiddenContactNumbers.indexOf(control.value) != -1){
      return {'contactNumberForbidden': true};
    }
    return null;
  }


  register(){
    console.log(this.registerForm.value);

      const message =" Confirm regsitration!"
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){

            const companyId=this.afAuth.auth.currentUser.uid;
            const fullName:string=this.registerForm.value.fullName;
            const address:string=this.registerForm.value.address;
            const nic:string=this.registerForm.value.nic;
            const email:string=this.registerForm.value.email;
            const contactNumber:string=this.registerForm.value.contactNumber;
            const state:string="active";
            const imagePath:string="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg";

            console.log(email);
            
           
            var createUser=this.afAuth.auth.createUserWithEmailAndPassword(email,nic).then(res=>{
              if(res.user.email){
                                const callable =  this.fns.httpsCallable('addRole');
                                callable({email:email,role:this.type,companyId:this.companyId}).subscribe(
                                  (response)=>{
                                      console.log(response);     
                                  },
                                  ()=>{},
                                  ()=>{
                                      const uid = res.user.uid;
                                      const stockManager1:StockManager={fullName,address,nic,email,contactNumber,state,companyId,imagePath,uid}
                                      this.stockManagerCollection.doc(res.user.uid).set(stockManager1).then(response2=>{
                                        console.log(response2);
                                        this.registerForm.reset();
                                      }
                                      )
                                    }
                                )
              }
            }).catch(error => {
              console.log(error.message);
              this.message=error.message;
          })   
          }
        })  
         
  }

onReset(){
  this.registerForm.reset();
  this.message = null;
}

}