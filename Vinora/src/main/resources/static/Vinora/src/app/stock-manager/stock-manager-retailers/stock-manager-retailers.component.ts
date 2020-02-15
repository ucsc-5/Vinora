import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailerService,RetailerId,RetailerEmailTokenId,RetailerEmailToken } from 'src/app/service/retailer.service';
import { CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router,ActivatedRoute} from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { finalize, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-stock-manager-retailers',
  templateUrl: './stock-manager-retailers.component.html',
  styleUrls: ['./stock-manager-retailers.component.css']
})
export class StockManagerRetailersComponent implements OnInit {

  retailersTakens: Observable<RetailerEmailTokenId[]>
  companyId: string
  
  constructor(private companyService :CompanyService,private afAuth: AngularFireAuth,private router:Router,private route:ActivatedRoute,private afs: AngularFirestore) {
    this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult)=>{
      this.companyId= idTokenResult.claims.cmpId;
    })
  }

  ngOnInit() {
    this.retailersTakens = this.afs.collection('companies').doc(this.companyId).collection('registeredRetailers').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RetailerEmailToken;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  onSelect(retailerId:string){
    console.log("This is  retailer id "+retailerId);
    this.router.navigate([retailerId],{relativeTo: this.route})
  }
    
  }
