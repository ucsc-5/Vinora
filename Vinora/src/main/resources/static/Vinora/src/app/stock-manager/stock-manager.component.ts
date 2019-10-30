import { Component, OnInit } from '@angular/core';
import { StockManagerId, StockManagerService } from '../service/stock-manager.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;
  constructor(private StockManagerService:StockManagerService,private afAuth: AngularFireAuth) {
    this.stockManagerEmail=this.afAuth.auth.currentUser.email;
  }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail);
  }


  
  opened = true;

  log(state){
    console.log(state)
  }


}
