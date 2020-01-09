import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  companyId: string;

  company: Observable<CompanyId[]>
 
  constructor(private router:Router,private companyService: CompanyService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
   
   
    this.company= this.companyService.getCompanyById(this.companyId);
  }

}
