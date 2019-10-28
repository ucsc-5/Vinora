import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService, Company, CompanyId, Item, ItemsId } from 'src/app/service/company.service';
import { CompanyEmailTokenId, CompanyEmailToken } from 'src/app/service/retailer.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ret-ord-comp-element',
  templateUrl: './ret-ord-comp-element.component.html',
  styleUrls: ['./ret-ord-comp-element.component.css']
})
export class RetOrdCompElementComponent implements OnInit {

  @Input() companyEmail : CompanyEmailToken;
  
  company: Observable<CompanyId[]>;
  // company: CompanyId;
  myCom: Promise<void>;
  

  dbPath= "companies";

  constructor(private companyService:CompanyService,private readonly afs: AngularFirestore) { }

  ngOnInit() {
    
  this.company = this.companyService.getCompanyByEmail(this.companyEmail.companyEmail);

  }

  ngAfterViewInit(){

    // console.log(this.companyEmail.companyEmail);
    // this.company = this.companyService.getCompanyByEmail(this.companyEmail.companyEmail);
    
    // this.myCom = this.company.forEach(x=>{
    //   console.log(x[0].managerName);
    //   const id=x[0].id;
    //   const address= x[0].address;
    //   const companyName = x[0].companyName;
    //   const email = x[0].email;
    //   const managerName = x[0].managerNic;
    //   const state= x[0].state;
    //   const contactNumber = x[0].contactNumber;
    //   const managerNic = x[0].managerNic;
    //   const imagePath = x[0].imagePath;
    //   const company1 :CompanyId={id,address,companyName,contactNumber,email,managerName,managerNic,state,imagePath};
    //   return company1;
    // });

    // console.log(this.myCom);

  }

  onHold(){
    // console.log("This is from the hold function");
    // console.log(this.myCom.id);
  }


}
