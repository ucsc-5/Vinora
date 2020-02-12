import { Component, OnInit, } from '@angular/core';
import { Router,ActivatedRoute,Params,RouterEvent} from '@angular/router';
import { ItemService, Item, ItemId } from 'src/app/service/item.service';
import { Observable } from 'rxjs';
import { NgForm,FormGroup, FormControl, Validators} from '@angular/forms';
import { DialogService } from 'src/app/service/dialog.service';
import { AngularFireObject,AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-update-item-details',
  templateUrl: './update-item-details.component.html',
  styleUrls: ['./update-item-details.component.css']
})
export class UpdateItemDetailsComponent  implements OnInit {

  itemId:string;

mySubscription: any;

  // item:Observable<ItemId[]>
  item:Item

  updateUnitValueForm: FormGroup;
  updateQuantityForm:FormGroup;
  // quantityRef: AngularFireObject<any>
  // itemsQuantity: Observable<any[]>;
  message: any;
  manual:boolean = true;
  byScaler: boolean = false;
  newQuantity
  quantity

  quantityRef: AngularFireObject<any>
  
  constructor(private db: AngularFireDatabase,private router:Router,private route:ActivatedRoute,private itemService:ItemService,private dialogService:DialogService) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
    this.quantityRef = db.object('weights');

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

        console.log(this.item);
        
        // this.item.brand=x.data().brand;

        // this.item.category=;
        // this.item.companyId=x.data().companyId;
        // this.item.description=x.data().description;
        // this.item.itemImagePath=x.data().itemImagePath;
        // this.item.itemName=x.data().itemName;
        // this.item.quantity=x.data().quantity;
        // this.item.reOrderingLevel=x.data().reOrderingLevel;
        // this.item.state=x.data().state;
        
        
      }
    )

    this.updateUnitValueForm = new FormGroup({
     
      'unitValue': new FormControl(null,[Validators.min(0)])
    })

    this.updateQuantityForm = new FormGroup({
      'quantity': new FormControl(null,[Validators.min(0)])
    })

  
   
  
  }



  updateUnitValue() {
    const unitValue = this.updateUnitValueForm.value.unitValue;
    console.log(unitValue);
    
    
    
    const message="Confrim"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.message = this.itemService.updateItem(this.itemId,{unitValue: unitValue}).then(
            x=>{
              this.ngOnInit();
              // this.unitValue=unitValue;
              return "Update is done";
              
            }
          ).catch(
            error=>{error}
          )
        }
      }
    );
    console.log(this.message);

    
 
  }



  updateQuantity() {
    const quantity = this.updateQuantityForm.value.quantity;
    console.log(quantity);
    
    const newQuantity= this.item.quantity+quantity;
    const message="Confrim"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.message = this.itemService.updateItem(this.itemId,{quantity: newQuantity}).then(
            x=>{
              this.ngOnInit();
              return "Update is done";
             
            }
          ).catch(
            error=>{error}
          )
        }
      }
    );
    console.log(this.message);
      
  }

  onClickManual(){
    this.manual=!this.manual;
    this.byScaler=!this.byScaler;
  }
  onClickScaler(){
    this.byScaler=!this.byScaler;
    this.manual=!this.manual;
  }


  resetQuantityForm(){
    this.updateQuantityForm.reset();
  }

  resetUnitValueForm(){
    this.updateUnitValueForm.reset();
  }



ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}
}
