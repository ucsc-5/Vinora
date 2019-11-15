import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private autheService:AuthenticationService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  onLogOut(){
    this.autheService.logout()
  }

  toMyDashboard(){
    this.router.navigate(['dashboard'],{relativeTo:this.route});
  }

}
