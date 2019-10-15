import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/service/item.model';
import { element } from 'protractor';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

 

  company: Observable<any[]>;
  items: Item[];

  constructor(private companyService: CompanyService) {

  }

  ngOnInit() {


    this.company = this.companyService.company;
    this.company.subscribe(response=>{
      response.forEach(element=>{
        // this.items=element.items;
        element.items

      })
    })

  }
    // this.company.subscribe((item) => {
    //   item.forEach(element => {
    //     console.log(element.items);

    //     this.items=element.items.map(c => ({ key: c.payload.key, ...c.payload.val() }))})
    // this.company.subscribe((item) => {
    //   console.log(item[0].items['-Lr-cJmnm9uhn1_3SLsB'].brand);
    // });
  
// }
//   }
}