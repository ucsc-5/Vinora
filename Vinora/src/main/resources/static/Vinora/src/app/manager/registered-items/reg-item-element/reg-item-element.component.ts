import { Component, OnInit, Input } from '@angular/core';
import { ItemsId, CompanyService } from 'src/app/service/company.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reg-item-element',
  templateUrl: './reg-item-element.component.html',
  styleUrls: ['./reg-item-element.component.css']
})
export class RegItemElementComponent implements OnInit {

  @Input() item:ItemsId

  companyKey

  constructor(private companyService:CompanyService, private afAuth: AngularFireAuth) {
    this.companyKey= this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {

  }

  onRemove(){
    this.companyService.deleteItem(this.companyKey,this.item.id).then(x=>{
      console.log(x+" deleted");
    }).catch(error=>{
      console.log(error+" error in deletiong");
    });
  }

  

}
