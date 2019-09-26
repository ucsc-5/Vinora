import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from 'src/app/service/stock.model';
import { StockService } from 'src/app/service/stock.service';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { idTokenResult } from '@angular/fire/auth-guard';

@Component({
  selector: 'app-register-d-company',
  templateUrl: './register-d-company.component.html',
  styleUrls: ['./register-d-company.component.css']
})
export class RegisterDCompanyComponent implements OnInit {

  type = 'manager';

  constructor(private afAuth: AngularFireAuth,private fns: AngularFireFunctions,private stockService:StockService,private db: AngularFireDatabase, private authServise:AuthenticationService) { 
    
  }
  ngOnInit() {
  }

  register(form: NgForm){
    const value =form.value;
    const userEmail = value.email;
    const password = value.password;
    const stock = new Stock(value.stockName,value.managerId,value.manager,value.email,value.address,value.tel)
    console.log(stock);
    this.authServise.register(userEmail,password,this.type);
    const callable = this.fns.httpsCallable('addRole');
    callable({email:userEmail,role:this.type}).subscribe(
      response=>{
        console.log(response);
      },()=>{},
      ()=>{
        this.authServise.login(userEmail,password);
        const uid = this.afAuth.auth.currentUser.uid;
        this.stockService.createStock(stock,uid);
      }
    )  
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}
