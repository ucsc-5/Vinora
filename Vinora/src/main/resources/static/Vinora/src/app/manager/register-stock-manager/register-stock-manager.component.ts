import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  register(){
    console.log(this.fullName.value)
  }

}
