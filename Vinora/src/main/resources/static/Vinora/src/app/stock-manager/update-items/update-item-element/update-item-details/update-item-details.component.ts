import { Component, OnInit, } from '@angular/core';
import { Router,ActivatedRoute,Params,RouterEvent} from '@angular/router';
import { ItemService, Item, ItemId } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { NgForm,FormGroup, FormControl, Validators} from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';

@Component({
  selector: 'app-update-item-details',
  templateUrl: './update-item-details.component.html',
  styleUrls: ['./update-item-details.component.css']
})
export class UpdateItemDetailsComponent  implements OnInit {

  itemId:string;

  item:Item

  updateQuantityForm:FormGroup;
  updateQuantityFormValid=true;
  message: any;
  manual:boolean = true;
  byScaler: boolean = false;
  method = ' manual'
  newQuantity
  quantity

  quantityRef: AngularFireObject<number>
  itemsQuantity: Observable<number>;
  
  constructor(private db: AngularFireDatabase,private router:Router,private route:ActivatedRoute,private itemService:ItemService,private dialogService:DialogService) {

   }

  ngOnInit() {

    this.route.params.subscribe((param:Params)=>{
      this.itemId = param['itemId'];})
    this.itemService.getStockItem(this.itemId).get().subscribe(
      x=>{        
        const brand = x.data().brand;
        const category = x.data().category;
        const companyId = x.data().companyId;
        const description =x.data().description;
        const itemImagePath=x.data().itemImagePath;
        const itemName=x.data().itemName;
        const quantity=x.data().quantity;
        const reOrderingLevel=x.data().reOrderingLevel;
        const state=x.data().state;
        const type=x.data().type;
        const unitPrice=x.data().unitPrice;
        const unitValue=x.data().unitValue;
        this.item = {brand,category,companyId,description,itemImagePath,itemName,quantity,reOrderingLevel,state,type,unitPrice,unitValue};

        
      }
    )
    this.quantityRef = this.db.object('weights');
    this.itemsQuantity = this.quantityRef.valueChanges();

  

  }

  readUnitValueFromScaler(){

  }











onSend(x:string){
  console.log(x+"this is the value");
  
  console.log(this.itemsQuantity.source);
  
}

}
