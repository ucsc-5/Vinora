import { Component, OnInit, Input } from '@angular/core';
import { CompanyService, Company } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/service/item.model';
import { element } from 'protractor';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

 

  companyEmail;

  company: Observable<Company[]>;

  constructor(private companyService: CompanyService,private afAuth: AngularFireAuth,private readonly afs: AngularFirestore) {
    this.companyEmail= this.afAuth.auth.currentUser.email
  
  }

  ngAfterViewInit(){

    // this.companyDocument = this.afs.doc<Company>('companies/'+this.currentCompannyId);
    // this.myCompany= this.companyDocument.valueChanges();

    // this.myCompany.forEach(data=>{
    //   this.company.companyName = data.companyName;
    //   this.company.companyId = data.companyId;
    //   this.company.address = data.address;
    //   this.company.managerName =  data.managerName;
    //   this.company.managerNic = data.managerNic;
    //   this.company.email= data.email;
    //   this.company.contactNumber = data.contactNumber;
    //   this.company.state = data.state;
    //   this.company.key = data.key;
    //   this.company.imagePath = data.imagePath;
    // })
    // console.log(this.company);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

  }
  ngOnInit() {


    this.company = this.companyService.getCompanyByEmail(this.companyEmail)
    // var docref = this.afs.collection('/companies').doc(this.currentCompannyId);
    // docref.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Company;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );





    // this.companyDocument = this.afs.doc<Company>(`companies/${this.currentCompannyId}`);
    // this.myCompany= this.companyDocument.valueChanges();

    // this.myCompany.forEach(data=>{
    //   this.companyName = data.companyName;
    //   this.company.companyId = data.companyId;
    //   this.company.address = data.address;
    //   this.company.managerName =  data.managerName;
    //   this.company.managerNic = data.managerNic;
    //   this.company.email= data.email;
    //   this.company.contactNumber = data.contactNumber;
    //   this.company.state = data.state;
    //   this.company.key = data.key;
    //   this.company.imagePath = data.imagePath;
    // })

    // this.retailer =this.afs.collection(`companies/${this.currentCompannyId}` , ref => ref.get().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Reatiler;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
   
  }
}