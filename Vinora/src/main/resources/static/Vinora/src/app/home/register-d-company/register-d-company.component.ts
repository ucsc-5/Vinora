import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from 'src/app/service/stock.model';
import { StockService } from 'src/app/service/stock.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-d-company',
  templateUrl: './register-d-company.component.html',
  styleUrls: ['./register-d-company.component.css']
})
export class RegisterDCompanyComponent implements OnInit {

  constructor(private stockService:StockService) { }

  ngOnInit() {
  }

  register(form: NgForm){
    const value =form.value;
    const stock = new Stock(value.stockName,value.managerId,value.manager,value.email,value.address,value.tel)
    this.stockService.createStock(stock);
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}
