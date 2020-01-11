import { Component, OnInit,Input } from '@angular/core';
import { RetailerService,RetailerId,RetailerEmailTokenId } from 'src/app/service/retailer.service';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stm-retailer-list-element',
  templateUrl: './stm-retailer-list-element.component.html',
  styleUrls: ['./stm-retailer-list-element.component.css']
})
export class StmRetailerListElementComponent implements OnInit {
  @Input()  retailersTaken: RetailerEmailTokenId
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {

  }

  onSelect(){
    this.router.navigate([this.retailersTaken.retailerUid],{relativeTo: this.route})
  }

}
