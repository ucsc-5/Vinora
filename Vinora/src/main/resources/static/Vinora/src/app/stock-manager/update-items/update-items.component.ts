import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { ItemService } from 'src/app/service/item.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyId, CompanyService, Item, ItemsId } from 'src/app/service/company.service';
import { StockManager } from 'src/app/service/stock-manager.service';




@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Item>;
  items: Observable<ItemsId[]>;
  stockManager:Observable<StockManager[]>
  constructor(db: AngularFireDatabase,private afs: AngularFirestore,private afAuth: AngularFireAuth,private companyService: CompanyService) {

    
  }
 
  ngOnInit() {
    const email:string= this.afAuth.auth.currentUser.email;

    this.companyService.getCompanyByEmail("chamodlakmal97@gmail.com").subscribe(x=>{
      //console.log(x[0]["id"])
    })
                  this.afs.collectionGroup('stockManagers',ref=>ref.where('email', '==', email)).snapshotChanges()  
                      this.stockManager =this.afs.collectionGroup('stockManagers',ref=>ref.where('email', '==', email)).snapshotChanges().pipe(
                        map(actions => actions.map(a => {
                          const data = a.payload.doc.data() as StockManager;
                          const id = a.payload.doc.id;
                          return { id, ...data };
                        }))
                      );
                      this.stockManager.subscribe(x=>{
                        console.log(x)
                      })                
    
    
  }

  
  }

