import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-temporary-welcome',
  templateUrl: './temporary-welcome.component.html',
  styleUrls: ['./temporary-welcome.component.css']
})
export class TemporaryWelcomeComponent implements OnInit {

  notRegsiter

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      if(param['type']==0){
        this.notRegsiter = true;
      }else if(param['type']==1){
        this.notRegsiter = false
      } 
    })
  }


  onBack(){
    this.router.navigate(['/'])
  }

}
