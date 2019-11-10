import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyId, CompanyService } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { ItemId, ItemService } from 'src/app/service/item.service';
import { RetailerService } from 'src/app/service/retailer.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { relative } from 'path';

@Component({
  selector: 'app-order-from-company',
  templateUrl: './order-from-company.component.html',
  styleUrls: ['./order-from-company.component.css']
})
export class OrderFromCompanyComponent implements OnInit {

  companyId: string;

  company: Observable<CompanyId[]>
  items: Observable<ItemId[]>

0
  constructor(private router:Router,private companyService: CompanyService,private itemService:ItemService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.companyId = param['companyId'];
    });
   
    this.items= this.itemService.getItemsByCompanyId(this.companyId);
    this.company= this.companyService.getCompanyById(this.companyId);
    
  }

  toMyCart(company: CompanyId){
    // this.router.navigate(['/myCart'],{queryParams:{cI:`${this.companyId}`}, fragment:"loading"});
    // this.router.navigate(['myCart',company.companyId],{relativeTo: this.route});
    // this.router.navigate(['/myCart']);
    this.router.navigate(['myCart'],{relativeTo:this.route});
  
  }



}
