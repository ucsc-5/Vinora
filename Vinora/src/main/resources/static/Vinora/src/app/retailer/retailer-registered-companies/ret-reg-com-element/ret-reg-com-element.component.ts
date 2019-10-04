import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ret-reg-com-element',
  templateUrl: './ret-reg-com-element.component.html',
  styleUrls: ['./ret-reg-com-element.component.css']
})
export class RetRegComElementComponent implements OnInit {

  @Input() companyKey;

  key: any;
  comapany$: Observable<any>;
  constructor(private companyServise: CompanyService) { }

  ngOnInit() {
    this.key= this.companyKey.key;
    console.log(this.key);
    this.companyServise.getCompany(this.key);
    this.comapany$=this.companyServise.company;
    // console.log(this.comapany);
  }

}
