import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockManagerId, StockManagerService } from 'src/app/service/stock-manager.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-stock-manger-dashboard',
  templateUrl: './stock-manger-dashboard.component.html',
  styleUrls: ['./stock-manger-dashboard.component.css']
})
export class StockMangerDashboardComponent implements OnInit {

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;

  constructor(private stockManagerService:StockManagerService,private afAuth: AngularFireAuth) { 
    this.stockManagerEmail= this.afAuth.auth.currentUser.email;
  }

  ngOnInit() {
    this.stockManager = this.stockManagerService.getStockManagerByEmail(this.stockManagerEmail);
    console.log(this.stockManager.subscribe(s=>{
      return s;
    }))
  }

}
