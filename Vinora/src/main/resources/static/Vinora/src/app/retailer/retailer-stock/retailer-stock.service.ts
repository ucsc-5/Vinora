import { Injectable, EventEmitter } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class RetailerStockService {

  stockSelected = new EventEmitter<Stock>();

  retailerToSelectStocks : Stock[]=[new Stock(1,'royal vintage','id','rangala' ,'royalvintage@gmail.com','colombo 05','0119876567','https://ofdollarsanddata.com/wp-content/uploads/2019/12/markets_trading.jpg'),
                                    new Stock(2,'Rms Productions','id','rangala' ,'royalvintage@gmail.com','colombo 05','0119876567','https://ofdollarsanddata.com/wp-content/uploads/2019/12/markets_trading.jpg')];

  
  retailerSelectedStocks : Stock[]=[];

  constructor() { }


  getRetailerToSelectStocks(){
    return this.retailerToSelectStocks;
  }

  getRetailerSelectedStocks(){
    return this.retailerSelectedStocks;
  }

  addSelectedStock(stock:Stock){
    this.retailerSelectedStocks.push(stock);
  }

}
