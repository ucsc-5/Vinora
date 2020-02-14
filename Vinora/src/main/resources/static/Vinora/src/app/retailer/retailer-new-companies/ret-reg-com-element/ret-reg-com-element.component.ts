import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CompanyService, Company, CompanyId } from 'src/app/service/company.service';
import { Observable } from 'rxjs';
import { RetailerService,RetailerId } from 'src/app/service/retailer.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DialogService } from 'src/app/service/dialog.service';


@Component({
  selector: 'app-ret-reg-com-element',
  templateUrl: './ret-reg-com-element.component.html',
  styleUrls: ['./ret-reg-com-element.component.css']
})
export class RetRegComElementComponent implements OnInit {

  @Input() company:CompanyId;
  @Input() register: boolean;

  retailerEmail: string;
  retailerUid: string;
  companyEmail: string;
  comapanyUid: string;
  registerCompanyName: string;
  retailer: Observable<RetailerId[]>;
 
 
  constructor(private dialogService:DialogService,private companyServise: CompanyService, private retailerService: RetailerService,private  afAuth:  AngularFireAuth) { 
    this.retailerEmail= this.afAuth.auth.currentUser.email;
    this.retailerUid = this.afAuth.auth.currentUser.uid;    
  }

  ngOnInit() {

    console.log(this.register);
    
  }

  onRegister(){
    const message="Confirm";
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
              this.retailerService.pendingWithCompany(this.retailerUid,this.company.id);
            }
          }
          )
    }

  onCancelRequest(){
    const message="Confirm";
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
                this.retailerService.cancelPendingWithCompany(this.retailerUid,this.company.id);
              }
            }
            )
  
  }
}
