import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { CompanyEmailTokenId, CompanyEmailToken } from 'src/app/service/retailer.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private companyService:CompanyService,private readonly afs: AngularFirestore, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    
  this.company = this.companyService.getCompanyByEmail(this.companyEmail.companyEmail);
  }

  onClick(com:any){
    console.log(com.id);
    // console.log(id+" this is the Id");

    this.router.navigate([com.id],{relativeTo: this.route})
  }

 

  onHold(){
    // console.log("This is from the hold function");
    // console.log(this.myCom.id);
  }


}
