import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sales-representative',
  templateUrl: './sales-representative.component.html',
  styleUrls: ['./sales-representative.component.css']
})
export class SalesRepresentativeComponent implements OnInit {

  salesrepresentatives: Observable<any[]>;
  managerId;

  constructor( private router: Router,private route:ActivatedRoute,private companyService:CompanyService,private afAuth: AngularFireAuth) {
    this.managerId= this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
    this.salesrepresentatives= this.companyService.getSalesRep(this.managerId);
  }

  onRegister(){
    this.router.navigate(['registerSalesRepresentative'],{relativeTo: this.route})
  }

}
