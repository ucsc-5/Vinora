import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-nav',
  templateUrl: './manager-nav.component.html',
  styleUrls: ['./manager-nav.component.css']
})
export class ManagerNavComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  OnProfile(){
    this.router.navigate(['myProfile'],{relativeTo: this.route});
  }

}
