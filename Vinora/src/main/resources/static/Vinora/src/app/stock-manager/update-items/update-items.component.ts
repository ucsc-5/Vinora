import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { ItemService,ItemId} from 'src/app/service/item.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyId, CompanyService} from 'src/app/service/company.service';
import { StockManager, StockManagerId, StockManagerService } from 'src/app/service/stock-manager.service';
import { element } from 'protractor';
import { database } from 'firebase';





@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {
  
 

  companyId: string;
  items: Observable<ItemId[]>;

  constructor(private StockManagerService:StockManagerService,private afAuth: AngularFireAuth,private itemService:ItemService){
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      // console.log("This is the needed"+idTokenResult.claims.cmpId.cmpId);
      this.companyId= idTokenResult.claims.cmpId.cmpId;
    })  
  
  }
 
  ngOnInit() {

    console.log(this.companyId+"This is the company Id");
   this.items = this.itemService.getItemsByCompanyId(this.companyId);
  }
}

