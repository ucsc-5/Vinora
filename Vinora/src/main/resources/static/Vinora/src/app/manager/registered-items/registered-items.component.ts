import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ItemService, ItemId } from 'src/app/service/item.service';

@Component({
  selector: 'app-registered-items',
  templateUrl: './registered-items.component.html',
  styleUrls: ['./registered-items.component.css']
})
export class RegisteredItemsComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<ItemId[]>;
  managerId;
  constructor(private itemServvise:ItemService,private afAuth: AngularFireAuth) {
    this.managerId= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.items= this.itemServvise.getItemsByCompanyId(this.managerId);
  }

}
