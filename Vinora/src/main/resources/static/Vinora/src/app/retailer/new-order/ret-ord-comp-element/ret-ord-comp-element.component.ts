import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { Company } from 'src/app/service/company.model';

@Component({
  selector: 'app-ret-ord-comp-element',
  templateUrl: './ret-ord-comp-element.component.html',
  styleUrls: ['./ret-ord-comp-element.component.css']
})
export class RetOrdCompElementComponent implements OnInit {

  @Input() company:Company;


  constructor(private companyServise: CompanyService) { }

  ngOnInit() {
   
  }


}
