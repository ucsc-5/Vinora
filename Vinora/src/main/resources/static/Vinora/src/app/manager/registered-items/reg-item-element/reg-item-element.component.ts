import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/service/item.model';
import { ItemService } from 'src/app/service/item.service';
import { NgForm } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reg-item-element',
  templateUrl: './reg-item-element.component.html',
  styleUrls: ['./reg-item-element.component.css']
})
export class RegItemElementComponent implements OnInit {

  @Input() item:Item

  constructor(private itemService:ItemService,private fns: AngularFireFunctions) {
    
  }

  ngOnInit() {

  }

  onRemove(){

      this.fns.httpsCallable('add2')({ text: 'Some',pay:'pay data ' })
      .pipe(first())
      .subscribe(resp => {
        console.log({ resp });
      }, err => {
        console.error({ err });
      })

      // callable({email:userEmail,role:this.type}).subscribe(

  
    // this.itemService.deleteItem(this.item.key);


  }

}
