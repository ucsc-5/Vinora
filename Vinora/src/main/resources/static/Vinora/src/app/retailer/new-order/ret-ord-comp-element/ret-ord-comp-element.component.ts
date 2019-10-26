import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService, Company, CompanyId, Item, ItemsId } from 'src/app/service/company.service';
import { CompanyEmailTokenId, CompanyEmailToken } from 'src/app/service/retailer.service';

@Component({
  selector: 'app-ret-ord-comp-element',
  templateUrl: './ret-ord-comp-element.component.html',
  styleUrls: ['./ret-ord-comp-element.component.css']
})
export class RetOrdCompElementComponent implements OnInit {

  @Input() companyEmail : CompanyEmailToken;
  
  company: Observable<CompanyId[]>;
  // company: CompanyId;
  myCom: CompanyId;
  

  items: Observable<ItemsId[]>

  constructor(private companyService:CompanyService) { }

  ngOnInit() {
    console.log(this.companyEmail.companyEmail);
    this.company = this.companyService.getCompanyByEmail(this.companyEmail.companyEmail);
    

    
    // this.company.forEach(x=>{
    //   this.myCom.id=x[0].id;
    //   // myCom.address= x[0].address;
    //   // myCom.companyName = x[0].companyName;
    //   // myCom.email = x[0].email;
    //   // myCom.managerName = x[0].managerNic;
    //   // myCom.state= x[0].state;
    // });

    // console.log(this.myCom.id);
    
    // this.items = this.companyService.getItems(this.myCom.id); 

  }

  onHold(){
    console.log("This is from the hold function");
  }


}
