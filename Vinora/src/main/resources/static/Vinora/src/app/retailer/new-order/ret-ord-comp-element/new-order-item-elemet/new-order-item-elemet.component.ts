import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-new-order-item-elemet',
  templateUrl: './new-order-item-elemet.component.html',
  styleUrls: ['./new-order-item-elemet.component.css']
})
export class NewOrderItemElemetComponent implements OnInit {


  constructor(private itemServise: ItemService) { }

  ngOnInit() {

    console.log("form the item elements");

  }

  toCart(form: NgForm){

    }
  
  }