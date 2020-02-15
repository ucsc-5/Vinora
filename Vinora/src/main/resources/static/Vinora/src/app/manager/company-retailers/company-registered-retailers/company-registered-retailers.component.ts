import { Component, OnInit, Input } from '@angular/core';
import { RetailerEmailTokenId, Retailer, RetailerId,RetailerService} from 'src/app/service/retailer.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-company-registered-retailers',
  templateUrl: './company-registered-retailers.component.html',
  styleUrls: ['./company-registered-retailers.component.css']
})
export class CompanyRegisteredRetailersComponent implements OnInit {

  @Input()retailerToken: RetailerEmailTokenId;
  registeredRetailers: Observable<RetailerId[]>
  companyId:string;
  constructor(private afs: AngularFirestore,private reatailerService:RetailerService,private afAuth: AngularFireAuth) {
    this.companyId=this.afAuth.auth.currentUser.uid;
   }

  ngOnInit() {
    console.log(this.retailerToken.id);
    this.registeredRetailers=this.reatailerService.getRetailerById(this.retailerToken.id);
    this.registeredRetailers.subscribe(x=>{
      x.length
      
    })
  }

  hold(){
    this.afs.collection('companies').doc(this.companyId).collection('registeredRetailers').doc(this.retailerToken.id).update({state:1});
  }

}
