import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retailer-nav',
  templateUrl: './retailer-nav.component.html',
  styleUrls: ['./retailer-nav.component.css']
})
export class RetailerNavComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
  }

  toMyCart(){
    console.log('jhdcbjshdcbjhsdc');
    // console.log(this.route);
    this.router.navigate(['myCart'],{relativeTo: this.route});
  }

}
