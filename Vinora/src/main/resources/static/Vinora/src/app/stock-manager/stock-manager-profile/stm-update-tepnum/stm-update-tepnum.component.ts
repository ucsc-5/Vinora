import { Component, OnInit, Input } from '@angular/core';
import { StockManagerId, StockManagerService, StockManager } from 'src/app/service/stock-manager.service';
import { NgForm, FormControl, Validators, FormGroup  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-stm-update-tepnum',
  templateUrl: './stm-update-tepnum.component.html',
  styleUrls: ['./stm-update-tepnum.component.css']
})
export class StmUpdateTepnumComponent implements OnInit {
  @Input() stockManager:StockManagerId

  updateNumber: FormGroup;
  frobiddenContactNumbers: Array<string> = ['000000000','0000000000'];
  validtp;
  message: any;
  constructor(private StockManagerService:StockManagerService) { }

  ngOnInit() {
    console.log(this.stockManager.uid);
    console.log(this.stockManager.email);

    let numericRegex = /^[0-9]+$/;

    let nicRanger = /^[vV0-9]+$/;
    
    this.updateNumber = new FormGroup({
      'contactNumber' : new FormControl(null,[Validators.required,Validators.minLength(9),Validators.maxLength(9),this.forbiddenContactNumbersValidator.bind(this),Validators.pattern(numericRegex)])
    });
    
    this.updateNumber.statusChanges.subscribe(state=>{
      console.log(state);
      
      if(state=="VALID"){
        this.validtp=true;
      }else{
        this.validtp=false;
      }
    }) 
  }

  forbiddenContactNumbersValidator(control: FormControl):{[s:string]: boolean}{
    if(this.frobiddenContactNumbers.indexOf(control.value) != -1){
      return {'contactNumberForbidden': true};
    }
    return null;
  }

  updateContactnumber(){

    
    let number = this.updateNumber.value.contactNumber;
    this.message = this.StockManagerService.updatePhoneNumber(this.stockManager.uid,number);
       
  
    console.log(this.message);


    // this.StockManagerService.updatePhoneNumber(stockManager.id,{contactNumber:value1});

  }


}
