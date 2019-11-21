import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-manager-nav',
  templateUrl: './manager-nav.component.html',
  styleUrls: ['./manager-nav.component.css']
})
export class ManagerNavComponent implements OnInit {

  company: Observable<CompanyId[]>;
  comapnyId: string;
  
  constructor(private autheService:AuthenticationService,private companyService:CompanyService,private router:Router,private route:ActivatedRoute,private afAuth: AngularFireAuth) { 
    this.comapnyId= this.afAuth.auth.currentUser.uid
  }

  ngOnInit() {
    this.company= this.companyService.getCompanyById(this.comapnyId);
    this.company.subscribe(x=>{
      console.log(x);
    })
  }

  OnProfile(){
    this.router.navigate(['myProfile'],{relativeTo: this.route});
  }

  onLogout(){
    this.autheService.logout();
  }


}
