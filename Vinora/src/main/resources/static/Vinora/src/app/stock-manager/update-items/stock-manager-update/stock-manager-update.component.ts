import { Component, OnInit, Input } from '@angular/core';
import { StockManager } from 'src/app/service/stock-manager.service';
import { Observable } from 'rxjs';
import { ItemsId } from 'src/app/service/company.service';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-stock-manager-update',
  templateUrl: './stock-manager-update.component.html',
  styleUrls: ['./stock-manager-update.component.css']
})
export class StockManagerUpdateComponent implements OnInit {

  @Input() stockManager: StockManager;
  items: Observable<ItemsId[]>;

  constructor(private itemService:ItemService) { }

  ngOnInit() {
    this.items = this.itemService.getItemsByCompanyId(this.stockManager.companyId);
  }

}
