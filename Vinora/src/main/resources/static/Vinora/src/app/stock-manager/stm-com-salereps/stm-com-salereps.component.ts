import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { SalesRepresentativeId, SalesRepresentativeService,SalesRepresentative } from 'src/app/service/sales-representative.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-stm-com-salereps',
  templateUrl: './stm-com-salereps.component.html',
  styleUrls: ['./stm-com-salereps.component.css']
})
export class StmComSalerepsComponent implements OnInit {

  stockManagerId: string
  companyId: string;
  saleRepresentatives: Observable<SalesRepresentativeId[]>
  constructor(private router: Router, private route:ActivatedRoute, private afAuth: AngularFireAuth,private saleRepservice: SalesRepresentativeService) { 
    this.stockManagerId= this.afAuth.auth.currentUser.uid;

    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId;
    })
  }

  ngOnInit() {
    this.saleRepresentatives=this.saleRepservice.getSalesRepByCompanyId(this.companyId);

    this.saleRepresentatives.subscribe(res=>{
      res.forEach(element=>{
        console.log(element);
      })
    })

  }


  onSelect(saleRep:SalesRepresentativeId){
    console.log(saleRep.id);
    this.router.navigate([saleRep.id],{relativeTo: this.route});
  }

}
