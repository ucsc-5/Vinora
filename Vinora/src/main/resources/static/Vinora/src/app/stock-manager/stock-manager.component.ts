import { Component, OnInit } from '@angular/core';
import { StockManagerId, StockManagerService } from '../service/stock-manager.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {

  stockManager: Observable<StockManagerId[]>;
  stockManagerEmail: string;
  constructor(private StockManagerService:StockManagerService,private afAuth: AngularFireAuth,private router:Router) {

    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      console.log(idTokenResult);
      this.stockManagerEmail= idTokenResult.claims.email;
    }).catch(error=>{
      this.router.navigate(['/'])
    }
      
    )

    // this.stockManagerEmail=this.afAuth.auth.currentUser.email;
  }

  ngOnInit() {
    this.stockManager= this.StockManagerService.getStockManagerByEmail(this.stockManagerEmail);
  }
  
  opened = true;

  log(state){
    console.log(state)
  }


}
