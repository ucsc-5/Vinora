import { Component, OnInit, Input } from '@angular/core';
import { StockManagerId, StockManagerService, StockManager } from 'src/app/service/stock-manager.service';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-stock-manager-dashboard',
  templateUrl: './stock-manager-dashboard.component.html',
  styleUrls: ['./stock-manager-dashboard.component.css']
})
export class StockManagerDashboardComponent implements OnInit {
  // @Input() stockManager: StockManager;
  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;

  constructor(private StockManagerService:StockManagerService,private afAuth: AngularFireAuth) {
    this.stockManagerEmail= this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail);
  }

}
