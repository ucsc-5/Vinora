import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router,ActivatedRoute} from '@angular/router';
import { ItemService, ItemId } from 'src/app/service/item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-main-stock',
  templateUrl: './company-main-stock.component.html',
  styleUrls: ['./company-main-stock.component.css']
})
export class CompanyMainStockComponent implements OnInit {

  companyId: string;
  reorderItems: Observable<ItemId[]>
  regularItems: Observable<ItemId[]>

  constructor(private afAuth: AngularFireAuth,private itemService:ItemService) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      // console.log("This is the needed"+idTokenResult.claims.cmpId.cmpId);
      this.companyId= idTokenResult.claims.cmpId;
    })
   }

  ngOnInit() {
    this.reorderItems=this.itemService.getReorderItemsByCompanyId(this.companyId);
    this.regularItems = this.itemService.getRegularItemsByCompnayId(this.companyId)
  }

}
