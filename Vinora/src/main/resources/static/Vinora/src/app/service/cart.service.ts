import { Injectable } from '@angular/core';
import { Item, OrderItemId, ItemService, ItemId } from './item.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';



export interface CartItem extends Item{
  itemId: string;
  retailerId: string;
  total: number;
  stmadded: boolean;
  itemCount:number;
}

export interface CartItemId extends CartItem{
  id:string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private dbPath = '/cart';
  private cartCollection: AngularFirestoreCollection<CartItem>;
  

  cartItemsByCompayId: Observable<CartItemId[]>;
  cartItemsByRetailerId: Observable<CartItemId[]>;
  cartItemsByCompayRetailer:  Observable<CartItemId[]>;

  
  newQuantity
  existCartItem:Observable<CartItem[]>
 
  constructor(private afs: AngularFirestore,private itemService:ItemService) {
    this.cartCollection = this.afs.collection<CartItem>('cart');
  }

  addItemsToCart(cartItem:CartItem){
    const id = this.afs.createId();
    this.cartCollection.doc(id).set(cartItem).then(
      res=>{
        console.log(" Here is the response "+res);
      }
    ).catch(error=>{
      console.log("Error "+ error);
    });
    
  }


  addQuantityCartItem(quantity:number,item:CartItemId){
    const newCartQuantity= item.quantity+quantity;
    this.afs.collection('items').doc(`${item.itemId}`).get().subscribe(x=>{
      this.newQuantity=+x.data().quantity-quantity;
      const reOrderLevel=+x.data().reOrderingLevel;

      console.log(reOrderLevel+"Re order level");
      console.log(this.newQuantity+" new quantity");
      
    
      this.itemService.updateItem(item.itemId,{quantity:this.newQuantity}).then(res=>{
            if(this.newQuantity>reOrderLevel){
              this.itemService.updateItem(item.itemId,{reOrder:false})  
            }else{
              this.itemService.updateItem(item.itemId,{reOrder:true})
            }
      }).catch(error=>{
        console.log(error);
        
      })
      this.updateItem(item.id,{quantity:newCartQuantity})
    })
  }

  addQuantitytItem(quantity:number,item:CartItemId,retailerId:string,companyId:string){
    const newCartQuantity= item.itemCount+quantity;
    
    
    this.afs.collection('retailers').doc(`${retailerId}`).collection('items').doc(item.itemId).get().subscribe(x=>{
      this.newQuantity=+x.data().itemCount+quantity;
    

   
      console.log("item count"+this.newQuantity);
    
      this.itemService.updateQuantityItem(item.itemId,{itemCount:this.newQuantity},retailerId,companyId);
    
    })
  }

  redeuseQuantityCartItem(quantity:number,item:CartItemId){
    const newCartQuantity= item.quantity-quantity;
    this.afs.collection('items').doc(`${item.itemId}`).get().subscribe(x=>{
      this.newQuantity=x.data().quantity+quantity;
      const reOrderLevel=+x.data().reOrderingLevel;

      this.itemService.updateItem(item.itemId,{quantity:this.newQuantity}).then(x=>{
        
        if(this.newQuantity>reOrderLevel){
          this.itemService.updateItem(item.itemId,{reOrder:false})  
        }else{
          this.itemService.updateItem(item.itemId,{reOrder:true})
        }

        this.updateItem(item.id,{quantity:newCartQuantity});
      }
        ).catch(error=>{
        console.log(error+" this is the error");
      })
    })
  }


  setItemsToCart(cartItem:CartItem){
    console.log("set Items To cart")
    const companyId= cartItem.companyId;
    const itemId = cartItem.itemId;
    // const itemId = "aksnkasnxka";
    const retailerId = cartItem.retailerId;
    console.log(companyId+" companyId");
    console.log(retailerId+ " retailerId");
    console.log(itemId+" item Id");


    // this.existCartItem = this.afs.collection<CartItem>(this.dbPath , ref => ref.where('companyId','==',companyId).where('retailerId','==',retailerId).where('itemId','==',itemId).where('state','==',"active").limit(1)).valueChanges();

    const x: Subscription = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('retailerId','==',retailerId).where('itemId','==',itemId).where('state','==',"active").limit(1)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CartItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).pipe(first()).subscribe(x=>{
      if(x.length){
        const newQuantityValue= x[0].quantity+cartItem.quantity;
        this.updateItem(x[0].id,{quantity:newQuantityValue});
        console.log(" yes part");
        
        // this.updateCartItem(key,{quantity:newQuantityValue})
      }else{
        this.addItemsToCart(cartItem);
        console.log(" no part");
        
      }
    })

    // x.unsubscribe();

  }


  updateItem(key: string, value: any): Promise<void> {
    return this.afs.collection('cart').doc(key).update(value);
  } 

  deleteItem(key: string) {
    this.afs.collection('cart').doc(`${key}`).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  } 
  

  getCartItemsFromOrderByCompanyId(companyId:string){
    this.cartItemsByCompayId = this.afs.collection(this.dbPath , ref => ref.where('companyId','==',companyId).where('state','==',"active")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CartItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.cartItemsByCompayId;
  }

  getCartItemsFromOrderByRetailerId(retailerId: string){
    this.cartItemsByRetailerId = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('state','==',"active")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CartItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.cartItemsByRetailerId;
  }

  getCartItemsFromOrderByCompanyIdRetailerId(companyId:string,retailerId:string){
    this.cartItemsByCompayRetailer = this.afs.collection(this.dbPath , ref => ref.where('retailerId','==',retailerId).where('companyId','==',companyId).where('state','==',"active")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CartItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.cartItemsByCompayRetailer;
  }
    

  retailerRemoveItemFromCart(key: string,item:CartItemId){
    this.afs.collection('items').doc(`${item.itemId}`).get().subscribe(x=>{
      const reOrderLevel=+x.data().reOrderingLevel;
      this.newQuantity=x.data().quantity+item.quantity;
      this.itemService.updateItem(item.itemId,{quantity:this.newQuantity}).then(x=>{
        if(this.newQuantity>reOrderLevel){
          this.itemService.updateItem(item.itemId,{reOrder:false})  
        }else{
          this.itemService.updateItem(item.itemId,{reOrder:true})
        }
        this.removeItem(item.id);
      }
        ).catch(error=>{
        console.log(error+" this is the error");
        
      })
    })
  }

  removeItem(key:string){
    this.afs.collection("cart").doc(`${key}`).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
   
  }



}
