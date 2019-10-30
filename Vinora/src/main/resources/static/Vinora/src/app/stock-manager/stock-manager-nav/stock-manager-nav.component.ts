import { Component, OnInit, Input } from '@angular/core';
import { StockManager, StockManagerId, StockManagerService } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-manager-nav',
  templateUrl: './stock-manager-nav.component.html',
  styleUrls: ['./stock-manager-nav.component.css']
})
export class StockManagerNavComponent implements OnInit {

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;

  constructor(private StockManagerService:StockManagerService,private afAuth: AngularFireAuth,private autheService:AuthenticationService,private router:Router,private route:ActivatedRoute) {
    this.stockManagerEmail= this.afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail);
  }

  onLogout(){
    this.autheService.logout();
  }


  onProfile(){
    this.router.navigate(['myProfile'],{relativeTo: this.route});
  }
}
