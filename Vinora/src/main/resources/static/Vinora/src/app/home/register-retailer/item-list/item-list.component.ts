import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  // items: Item[] = [
  //   new Item(1,'The name','The brand','Description','http://ablooh.com/wp-content/uploads/2019/04/105507343-close-up-of-red-lentils-or-masoor-dal-isolate-on-white-background.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn51z3o627fUM5nBNPp3vUU5EDLgVWT7G5lyLyLqNfRebduOrEOg'),
  //   new Item(2,'Second Item','Second Item Brand','Second item Description','https://bakingmischief.com/wp-content/uploads/2018/06/how-to-steam-green-beans-in-the-microwave-image-square-500x375.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQFjY1BVUo4nWLS_jj61xt8AZJ9SKtOZQ2IIrtoIoIu1SXmUPdhg')
  // ];

  constructor() { }

  ngOnInit() {
  }

}
