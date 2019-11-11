import { Component, OnInit, Input } from '@angular/core';
import { CartItemId } from 'src/app/service/cart.service';

@Component({
  selector: 'app-current-item-elemet',
  templateUrl: './current-item-elemet.component.html',
  styleUrls: ['./current-item-elemet.component.css']
})
export class CurrentItemElemetComponent implements OnInit {

  @Input() item:CartItemId;

  constructor() { }

  ngOnInit() {
    console.log(this.item);
  }

}
