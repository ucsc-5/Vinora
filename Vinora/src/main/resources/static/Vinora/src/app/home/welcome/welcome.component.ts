import { Component, OnInit } from '@angular/core';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  registeredCompanies: Observable<CompanyId[]>;

  constructor(private companyServise:CompanyService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit() {
    this.registeredCompanies= this.companyServise.getRegisteredCompanies();
  }
  
  onToRegisteredCompanies(){
    this.router.navigate(['../','registeredCompanies'],{relativeTo:this.route});
    console.log("registered");
  }

}