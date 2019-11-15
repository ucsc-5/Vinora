import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  opened = true;
  constructor(private companyServise:CompanyService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['dashboard'],{relativeTo:this.route});
  }

  toMyDashboard(){
    this.router.navigate(['dashboard'],{relativeTo:this.route});
  }



}
