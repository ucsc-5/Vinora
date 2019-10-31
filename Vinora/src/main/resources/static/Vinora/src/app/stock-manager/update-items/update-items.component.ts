import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { ItemService } from 'src/app/service/item.service';
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
  
  stockManager: Observable<StockManagerId[]>;
  stockMangerEmail:string;
  constructor(private StockManagerService:StockManagerService,private afAuth: AngularFireAuth,private itemService:ItemService){
    this.stockMangerEmail= this.afAuth.auth.currentUser.email;
  }
 
  ngOnInit() {
   this.stockManager=this.StockManagerService.getStockManagerByEmail(this.stockMangerEmail)
  }
}

