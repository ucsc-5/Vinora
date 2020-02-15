import { Component, OnInit, Input,ElementRef, ViewChild } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { OrderService } from 'src/app/service/order.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-stm-con-order-element',
  templateUrl: './stm-con-order-element.component.html',
  styles:[`
    .online{
      color: red;
    }
  `],
  styleUrls: ['./stm-con-order-element.component.css']
})
export class StmConOrderElementComponent implements OnInit {


  @Input() item:CartItemId
  @Input() orderId:string
  added: Boolean
  
  @Input() orderTotal: number

  constructor(private dialogService:DialogService,private orderService:OrderService,private afs: AngularFirestore) { }
  @ViewChild('content',{ static: true }) content:ElementRef;
  
  ngOnInit() {
    if(this.item.stmadded){
      this.added=true;
    }else{
      this.added=false;
    }
  }

  onAdd(){
    console.log(this.orderId);
    
    this.dialogService.confirmItemDialog(this.item).afterClosed().subscribe(
      res=>{
        if(res){
          this.dialogService.openConfirmDialog("confirm").afterClosed().subscribe(
            res2=>{
              if(res2){
                this.item.stmadded=true;
                this.afs.collection('orders').doc(this.orderId).collection('items').doc(this.item.id).set(this.item).then(x=>{
                  console.log("Item updatete stmadded");
                  this.afs.collection('orders').doc(this.orderId).get().subscribe(
                    x2=>{
                      const newTotal=x2.data().tempTotal+this.item.total;
                      this.afs.collection('orders').doc(this.orderId).update({tempTotal:newTotal}).then(()=>{
                        console.log("Temp total updated");
                      }).catch(
                        error=>{
                          console.log(error+" this is error in update tempTotal");
                          return error;
                        }
                      )
                    }
                  )
                }).catch(error=>{
                  console.log(error+" This is the error of update the stmadded ");
                  return error;
                })

                // this.orderService.stockManagerAddItem(this.orderId,this.item.id,this.item.total);
                // this.tempOrder.addItems(this.item,this.orderId,this.orderTotal);
              }
            }
          )
        }
        
        })

        this.ngOnInit()

    console.log(this.item);
    
  }

  onDrop(){

    this.dialogService.openConfirmDialog("confirm").afterClosed().subscribe(
      res=>{
        if(res){
          this.item.stmadded=false;
          this.afs.collection('orders').doc(this.orderId).collection('items').doc(this.item.id).update({stmadded:false}).then(x=>{
            this.afs.collection('orders').doc(this.orderId).get().subscribe(
              x2=>{
                const newTotal=x2.data().tempTotal-this.item.total;
                this.afs.collection('orders').doc(this.orderId).update({tempTotal:newTotal}).then().catch(
                  error=>{
                    console.log(error+" this is error in update tempTotal");
                    return error;
                  }
                )
              }
            )
          }).catch(error=>{
            console.log(error+" this the error of updating in stmadded");
            return error;
          })
          // this.orderService.stockManagerDropItem(this.orderId,this.item.id,this.item.total);
        }})

        this.ngOnInit() 
  }

  public downloadPdf(){

    let doc = new jsPDF();
    let specialElementHandlers={
      '#editor' :function(element,renderer) {
        return true;
        
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('report.pdf');
  }


}


