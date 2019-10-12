import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-ret-ord-comp-element',
  templateUrl: './ret-ord-comp-element.component.html',
  styleUrls: ['./ret-ord-comp-element.component.css']
})
export class RetOrdCompElementComponent implements OnInit {

  @Input() companyKey;

  key: any;
  comapany$: Observable<any>;

  items: Observable<any[]>;     // for getting items

  constructor(private companyServise: CompanyService) { }

  ngOnInit() {
    this.key= this.companyKey.key;
    console.log(this.key);
    this.companyServise.getCompany(this.key);
    this.comapany$=this.companyServise.company;
    this.items= this.companyServise.getCompanyItems(this.key);
    console.log(this.items);
    // console.log(this.comapany);
  }

}
