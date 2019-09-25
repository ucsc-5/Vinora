import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from 'src/app/service/stock.model';
import { StockService } from 'src/app/service/stock.service';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register-d-company',
  templateUrl: './register-d-company.component.html',
  styleUrls: ['./register-d-company.component.css']
})
export class RegisterDCompanyComponent implements OnInit {

  type = 'manager';

  constructor( private authService: AuthenticationService,private fns: AngularFireFunctions,private stockService:StockService) { }

  ngOnInit() {
  }

  register(form: NgForm){
    const value =form.value;
    const userEmail = value.email;
    this.authService.register(value.email,value.password,this.type);
    const stock = new Stock(value.stockName,value.managerId,value.manager,value.email,value.address,value.tel)
    this.stockService.createStock(stock);
    const callable = this.fns.httpsCallable('addRole');
    callable({email:userEmail,role:this.type}).subscribe(
      response=>{
        console.log(response);
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
