import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


export interface Retailer { 
              id: string;
              shopName: string;
              email: string;
              address: string;
              contactNumber: string;
              state: string;
              url:string; 
            
            }


@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  selectedFiles: FileList;
  state = 'new';
  type = 'retailer';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  loggined = false;
  // retailerUid: string;

  retailer : Observable<Retailer[]>;
  private retailerCollection: AngularFirestoreCollection<Retailer>;

  constructor(
                private fns: AngularFireFunctions,
                private _formBuilder: FormBuilder,
                public afAuth: AngularFireAuth,
                private router: Router,
                private route:ActivatedRoute, 
                private authService: AuthenticationService,
                private retailerService:RetailerService,
                private readonly afs: AngularFirestore,
                private storage: AngularFireStorage) {

                  this.retailerCollection = afs.collection<Retailer>('retailers');
   
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      shopName: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]]  
    });
    
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]]
    });
    
  }
  
  async register(){
    const email : string = this.secondFormGroup.value['email'];
    const password = this.firstFormGroup.value['password'];

    const shopName = this.firstFormGroup.value['shopName'];
    const address = this.secondFormGroup.value['address'];
    const contactNumber = this.secondFormGroup.value['contactNumber'];
    const state = "0";
    const url ="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg";

    this.authService.register(email,password,this.type);

    const callable = await this.fns.httpsCallable('addRole');

    callable({email:email,role:this.type}).subscribe(
      (response)=>{
           console.log(response);
      },
      ()=>{},
      ()=>{
        this.authService.login(email,password).then(()=>{
        const id = this.afAuth.auth.currentUser.uid;
        const retailer: Retailer = {id,shopName,email,address,contactNumber,state,url};
        // this.retailerCollection.doc(id). set(retailer);
        this.retailerCollection.add(retailer).then(
          res=>{
            console.log(" Here is the response "+res);
          }
        ).catch(error=>{
          console.log("Error "+ error);
        });
      }
    )
   }
  )
}
      
      
      
      // return uploadTask.percentageChanges();

 
  

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }  


}
