import { Injectable, EventEmitter } from '@angular/core';
import { Stock } from 'src/app/stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class RetailerStockService {

  stockSelected = new EventEmitter<Stock>();

  retailerToSelectStocks : Stock[]=[new Stock(1,'royal vintage','id','rangala' ,'royalvintage@gmail.com','colombo 05','0119876567','https://ofdollarsanddata.com/wp-content/uploads/2019/12/markets_trading.jpg'),
                                    new Stock(2,'Rms Productions','id','Jayasooriya' ,'rmse@gmail.com','Nugegoda','0112556567','https://i.pinimg.com/originals/59/43/70/59437015006393da392a9fb8f3edfc13.jpg'),
                                    new Stock(3,'Vimukthi','id','Senewirathne' ,'vimukthi@gmail.com','Nugegoda','01125588867','https://img.washingtonpost.com/news/business/wp-content/uploads/sites/8/2014/08/grocery_cropped.jpg')];

                                   

  
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
