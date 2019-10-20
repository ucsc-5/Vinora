import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/service/company.model';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-admin-com-req-element',
  templateUrl: './admin-com-req-element.component.html',
  styleUrls: ['./admin-com-req-element.component.css']
})
export class AdminComReqElementComponent implements OnInit {

  @Input() company : Company;

  constructor(private companyService: CompanyService) { 
  }

  ngOnInit() {
    console.log(this.company.key);
  }

    
    onConfirm(){
      // this.companyService.updateCompany(this.company.key, {state:"1"})
      // .catch(err => console.log(err));
    }


}
