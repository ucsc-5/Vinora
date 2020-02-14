import { Component, OnInit, Input } from '@angular/core';
import { Company, CompanyId } from 'src/app/service/company.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-admin-com-reg-elemet',
  templateUrl: './admin-com-reg-elemet.component.html',
  styleUrls: ['./admin-com-reg-elemet.component.css']
})
export class AdminComRegElemetComponent implements OnInit {

  @Input() company: CompanyId

  constructor(private afs: AngularFirestore,private dialogService:DialogService) { }

  ngOnInit() {
  }

  onHold(){
    const message="Confirm Registration!"
    this.dialogService.openConfirmDialog(message).afterClosed().subscribe(
      res=>{
        if(res){
          this.afs.collection('companies').doc(this.company.id).update({state:0});
          
        }});

    
  }

}
