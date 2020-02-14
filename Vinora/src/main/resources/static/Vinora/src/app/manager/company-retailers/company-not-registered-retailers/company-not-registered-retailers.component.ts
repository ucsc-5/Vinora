import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerId, RetailerService } from 'src/app/service/retailer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService,CompanyId,Company } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-company-not-registered-retailers',
  templateUrl: './company-not-registered-retailers.component.html',
  styleUrls: ['./company-not-registered-retailers.component.css']
})
export class CompanyNotRegisteredRetailersComponent implements OnInit {

  @Input() retailer: RetailerId;
  companyId: string;

  notRegRetId:string;
  myCompany:Company;
  notRegisterRetailers: Observable<RetailerId[]>
  constructor (private afs: AngularFirestore,private route:ActivatedRoute, private retailerService: RetailerService,private companyService:CompanyService,private afAuth: AngularFireAuth) { 
    this.companyId=this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
      // this.saleRepresentatives=this.saleRepservice.getSalesRepByRepId(this.saleRepId);
          this.afs.collection('companies').doc(this.companyId).get().subscribe(x=>{        
          const address = x.data().address;
          const companyId = x.data().companyId;
          const companyName =x.data().companyName;
          const contactNumber=x.data().contactNumber;
          const la = x.data().latitude;
          const lo = x.data().longitude;

          // console.log(la,+"khjbhjk"+lo);
          
          const coord = new firebase.firestore.GeoPoint(6.754932708963181,80.2566408125);
          // const coord=x.data().itemName;
          const email=x.data().email;
          const imagePath=x.data().imagePath;
          const managerName=x.data().managerName;
          const managerNic=x.data().managerNic;
          const state=x.data().state;
         
          this.myCompany = {address,companyId,companyName,contactNumber,coord,email,imagePath,managerName,managerNic,state};
          
        }
      )

      console.log(this.myCompany);
      

  }

  regsiter(){
    console.log(this.myCompany);
     this.retailerService.registerWithCompany(this.notRegRetId,this.companyId,this.myCompany,this.retailer.email);
  }

}
