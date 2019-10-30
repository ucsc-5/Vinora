import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { LoginUser } from 'src/app/service/login-user';
import { Observable } from 'rxjs';
import { RetailerService, RetailerId } from 'src/app/service/retailer.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
// import { LoginUser } from 'src/app/service/login-user';

@Component({
  selector: 'app-retailer-nav',
  templateUrl: './retailer-nav.component.html',
  styleUrls: ['./retailer-nav.component.css']
})
export class RetailerNavComponent implements OnInit {

  retailer: Observable<RetailerId[]>
  retailerEmail:string;

  constructor(private afAuth: AngularFireAuth,private autheService:AuthenticationService, private router:Router, private route:ActivatedRoute, private retailerService:RetailerService) {
    this.retailerEmail= afAuth.auth.currentUser.email;
   }

  ngOnInit() {
    this.retailer= this.retailerService.getRetailerByEmail(this.retailerEmail);
  }

  toMyCart(){
    this.router.navigate(['myCart'],{relativeTo: this.route});
  }

  onLogout(){
    this.autheService.logout();
  }

  onProfile(){
    this.router.navigate(['myProfile'],{relativeTo: this.route});
  }

}
