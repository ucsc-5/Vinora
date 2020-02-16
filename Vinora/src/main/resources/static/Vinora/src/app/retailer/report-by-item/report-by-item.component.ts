import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemId } from 'src/app/service/item.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerService } from 'src/app/service/retailer.service';
import { CompanyId } from 'src/app/service/company.service';

@Component({
  selector: 'app-report-by-item',
  templateUrl: './report-by-item.component.html',
  styleUrls: ['./report-by-item.component.css']
})
export class ReportByItemComponent implements OnInit {

  items : Observable<ItemId[]>
  companies: Observable<CompanyId[]>;
  retailerId: string;

  constructor(private afAuth:AngularFireAuth,private retailerService:RetailerService) {
    this.retailerId= this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
    this.items = this.retailerService.getMyOrderedItems(this.retailerId);
  }

}
