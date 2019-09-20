import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { LoginUser } from 'src/app/service/login-user';
// import { LoginUser } from 'src/app/service/login-user';

@Component({
  selector: 'app-retailer-nav',
  templateUrl: './retailer-nav.component.html',
  styleUrls: ['./retailer-nav.component.css']
})
export class RetailerNavComponent implements OnInit {

  user : LoginUser  
  userId: any

  constructor(private router:Router, private route:ActivatedRoute, private userService: UserService) {
   }

  ngOnInit() {
  }

  toMyCart(){
    console.log('jhdcbjshdcbjhsdc');
    // console.log(this.route);
    this.router.navigate(['myCart'],{relativeTo: this.route});
  }

}
