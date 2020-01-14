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
  @Input() quantity: any

  updateForm: FormGroup;
  // quantityRef: AngularFireObject<any>
  // itemsQuantity: Observable<any[]>;
  message: any;
  manual:boolean = true;
  byScaler: boolean = false;
  newQuantity
 

  constructor(private router:Router,private route:ActivatedRoute,private db: AngularFireDatabase,private dialogService:DialogService,private itemServise:ItemService,private afs: AngularFirestore,private afAuth: AngularFireAuth) { 
    // this.itemVal = db.object('vehicles').valueChanges();

    // this.quantityRef = db.object('weights');
    // this.itemsQuantity = this.quantityRef.valueChanges();

  }

  ngOnInit() {
    this.updateForm = new FormGroup({
      'quantity': new FormControl(null,[Validators.min(0)]),
      'unitValue': new FormControl(null,[Validators.min(0)])
    })

    this.updateForm.value.quantity = this.quantity;
    console.log(this.quantity+" this is the quantity");

    this.newQuantity=+this.quantity/this.item.unitValue;
    
  }


  updateQuantity() {
    const quantity = this.updateForm.value.quantity;
    console.log(quantity);
    
    // const newQuantity= this.item.quantity+quantity;
    // const message="Confrim"
    // this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
    //   res=>{
    //     if(res){
    //       this.message = this.itemServise.updateItem(this.item.id,{quantity: newQuantity}).then(
    //         x=>{
    //           return "Update is done";
    //         }
    //       ).catch(
    //         error=>{error}
    //       )
    //     }
    //   }
    // );
    // console.log(this.message);
 
  }

  onClickManual(){
    this.manual=!this.manual;
    this.byScaler=!this.byScaler;
  }
  onClickScaler(){
    this.byScaler=!this.byScaler;
    this.manual=!this.manual;
  }


  reset(){
    this.updateForm.reset();
  }

  itemDetails(item:ItemId){
    console.log(item+" This is the item from");
    
    this.dialogService.openItemDetailsDialog(item).afterClosed();
  }

  onSelect(){
    console.log("This is  retailer id "+this.item.id);
    this.router.navigate([this.item.id],{relativeTo: this.route})
  }

}
