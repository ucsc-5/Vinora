import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.css']
})
export class RegisterRetailerComponent implements OnInit {

  name = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile = new FormControl();
  password = new FormControl();
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  save(){
    let body =new HttpParams({
      fromObject:{
        'name':this.name.value,
        'email':this.email.value,
        'phone':this.mobile.value,
        'password':this.password.value
      }
      
    });
    this.http.post<any>('http://localhost:8080/usercreate',body).subscribe(data=>{
      console.log(data);
      alert('Saved Successfully !');
    });

  }

  

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
