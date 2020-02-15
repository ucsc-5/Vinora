import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-company-registered',
  templateUrl: './company-registered.component.html',
  styleUrls: ['./company-registered.component.css']
})
export class CompanyRegisteredComponent implements OnInit {

  @ViewChild('content',{ static: true }) content:ElementRef;
  companies: Observable<CompanyId[]>;
  date: Date;

  constructor(private companyService:CompanyService) {
   
   }

  ngOnInit() {


    this.companies= this.companyService.getRegisteredCompanies();
    this.companies.subscribe(s=>{
      console.log(s.length);
    })
  }

  public downloadPdf(){

    let doc = new jsPDF();
    let specialElementHandlers={
      '#editor' :function(element,renderer) {
        return true;
        
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML,20,20,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('report.pdf');
  }


}
