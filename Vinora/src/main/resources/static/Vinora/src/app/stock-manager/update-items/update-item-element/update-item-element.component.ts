import { Component, OnInit, Input } from '@angular/core';
import { NgForm,FormGroup, FormControl, Validators} from '@angular/forms';
import { ItemService, Item, ItemId } from 'src/app/service/item.service';
import { from, Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { StockManager } from 'src/app/service/stock-manager.service';
import { DialogService } from 'src/app/service/dialog.service';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-item-element',
  templateUrl: './update-item-element.component.html',
  styleUrls: ['./update-item-element.component.css']
})

export class UpdateItemElementComponent implements OnInit {
  @Input() item: ItemId;
  @Input() quantity: number;
  doubleQuantity


 

  constructor(private router:Router,private route:ActivatedRoute,private db: AngularFireDatabase,private dialogService:DialogService,private itemServise:ItemService,private afs: AngularFirestore,private afAuth: AngularFireAuth) { 
    this.doubleQuantity=+this.quantity;
  }

  ngOnInit() {
    
     
  }

  onSelect(){
    this.router.navigate([this.item.id],{relativeTo: this.route})
  }

}
