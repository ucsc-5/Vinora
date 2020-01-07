import { Component, OnInit, Input } from '@angular/core';

import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { DialogService } from 'src/app/service/dialog.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { RetailerService, RetailerId, Retailer } from 'src/app/service/retailer.service';

@Component({
  selector: 'app-admin-com-req-element',
  templateUrl: './admin-com-req-element.component.html',
  styleUrls: ['./admin-com-req-element.component.css']
})
export class AdminComReqElementComponent implements OnInit {

  @Input() company : CompanyId;

  registerMessage

  constructor(private afs: AngularFirestore,private dialogService:DialogService,private companyService: CompanyService, private fns: AngularFireFunctions,private retailerService:RetailerService) { 
  }

  ngOnInit() {
  }   
  
  
  onConfirm(email:string){

    console.log(email);

    const message="Confirm Registration!"
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
        res=>{
          if(res){

            const callable = this.fns.httpsCallable('adminConfirmCompanyRequest');

            callable({email:email}).subscribe(
                    (response)=>{
                         this.registerMessage=response;

                          this.retailerService.getAllRetailers().forEach(
                            res1=>{
                            res1.forEach(res2=>{
                              this.afs.collection('retailers').doc(res2.id).collection('notRegCompanies').doc(this.company.id).set(this.company).then(res=>{
                                    console.log("company Added to each retailers");
                                  }).catch(error=>{
                                    console.log(error);
                                })
                            }) 
                            }
                          )
                         console.log(response);
                    },
                    (error)=>{
                      console.log(error);
                      
                    },
                    ()=>{
                      this.companyService.confirmRegistration(this.company.id).catch(err => console.log(err));
                    })
          }
        })

        console.log(this.registerMessage);
        
  }
}
