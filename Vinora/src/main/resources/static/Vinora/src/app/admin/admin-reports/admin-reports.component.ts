import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { CompanyService, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  @ViewChild('content1',{ static: true }) content1:ElementRef;
  @ViewChild('content2',{ static: true }) content2:ElementRef;
  
  requestedCompanies: Observable<CompanyId[]>;
  registeredCompanies: Observable<CompanyId[]>;
  
  
  constructor(private companyService:CompanyService) {}

  ngOnInit() {
    this.requestedCompanies = this.companyService.getRequestedCompanies();
    this.registeredCompanies= this.companyService.getRegisteredCompanies();
  }

  public requestedDownloadPdf(){

    let doc = new jsPDF();
    let specialElementHandlers={
      '#editor' :function(element,renderer) {
        return true;
        
      }
    };
    let content1 = this.content1.nativeElement;
    doc.fromHTML(content1.innerHTML,20,20,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('report.pdf');
  }

  public registeredDownloadPdf(){

    let doc = new jsPDF();
    let specialElementHandlers={
      '#editor' :function(element,renderer) {
        return true;
        
      }
    };
    let content2 = this.content2.nativeElement;
    doc.fromHTML(content2.innerHTML,20,20,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('report.pdf');
  }

}
