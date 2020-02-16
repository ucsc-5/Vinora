import { Component, OnInit, Input } from '@angular/core';
import { ItemId } from 'src/app/service/item.service';
import { CompanyId } from 'src/app/service/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-by-item-element',
  templateUrl: './report-by-item-element.component.html',
  styleUrls: ['./report-by-item-element.component.css']
})
export class ReportByItemElementComponent implements OnInit {

  @Input() item:ItemId;
  @Input() company:CompanyId;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  itemReport(item:ItemId){
        this.router.navigate(['../','orderedItems',item.id],{relativeTo:this.route});
  }

}
