import { Component, OnInit, Input } from '@angular/core';
import { Company, CompanyId } from 'src/app/service/company.service';


@Component({
  selector: 'app-admin-com-reg-elemet',
  templateUrl: './admin-com-reg-elemet.component.html',
  styleUrls: ['./admin-com-reg-elemet.component.css']
})
export class AdminComRegElemetComponent implements OnInit {

  @Input() company: CompanyId

  constructor() { }

  ngOnInit() {
  }

  onReport(){
    
  }

}
