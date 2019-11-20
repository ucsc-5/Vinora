import { Component, OnInit, Input } from '@angular/core';
import { StockManager, StockManagerId, StockManagerService } from 'src/app/service/stock-manager.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { DialogService } from 'src/app/service/dialog.service';


@Component({
  selector: 'app-display-stock-manager',
  templateUrl: './display-stock-manager.component.html',
  styleUrls: ['./display-stock-manager.component.css']
})
export class DisplayStockManagerComponent implements OnInit {

  @Input() stockManager:StockManagerId
  constructor(private stockManagerService:StockManagerService,private dialogService:DialogService,private afAuth: AngularFireAuth,private fns: AngularFireFunctions) { }

  ngOnInit() {
  }

  onRemove(){

    const message = "Are you sure "

    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){

          const email = this.stockManager.email;
          const uid = this.stockManager.uid;
          const callable = this.fns.httpsCallable('deleteUser');
          callable({email:email,uid:uid}).subscribe(response=>{
            console.log(response);
          },()=>{},
          ()=>{
            this.stockManagerService.removeStockManger(this.stockManager.id,{state:"deleted",reason:"this is the reason"})
          }
      
          )


        }
      })
  }

}
