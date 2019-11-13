import { Component, OnInit, Input } from '@angular/core';

import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-admin-com-req-element',
  templateUrl: './admin-com-req-element.component.html',
  styleUrls: ['./admin-com-req-element.component.css']
})
export class AdminComReqElementComponent implements OnInit {

  @Input() company : CompanyId;

  constructor(private dialogService:DialogService,private companyService: CompanyService) { 
  }

  ngOnInit() {
    // console.log(this.company.key);
  }   
  
  
  onConfirm(){
    const message="Confirm Registration!"
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){
                  this.companyService.confirmRegistration(this.company.id).catch(err => console.log(err));
          }
        })

  }
}
