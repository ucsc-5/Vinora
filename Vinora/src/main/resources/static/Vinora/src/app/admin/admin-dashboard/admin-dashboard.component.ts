import { Component, OnInit } from '@angular/core';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  requestCompanies: Observable<CompanyId[]>;
  registeredCompanies: Observable<CompanyId[]>;
  constructor(private companyServise:CompanyService,private router:Router,private route:ActivatedRoute) { 
  }

  ngOnInit() {
    this.requestCompanies = this.companyServise.getRequestedCompanies();
    this.registeredCompanies= this.companyServise.getRegisteredCompanies(); 
  }

  onToRegisteredCompanies(){
    this.router.navigate(['../','registeredCompanies'],{relativeTo:this.route});
    console.log("registered");
    
  }

  
  onToRequestedCompanies(){
    this.router.navigate(['../','companyRequests'],{relativeTo:this.route});
  }
    
}
