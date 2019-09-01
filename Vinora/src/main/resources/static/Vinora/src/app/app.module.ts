import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatModule } from './material.theme';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './home/login/login.component';
import { RegisterRetailerComponent } from './home/register-retailer/register-retailer.component';
import { RetailerComponent } from './retailer/retailer.component';
import { RetailerNavComponent } from './retailer/retailer-nav/retailer-nav.component';
import { FotterComponent } from './fotter/fotter.component';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import { CurrentOrdersComponent } from './retailer/current-orders/current-orders.component';import { ItemComponent } from './item/item.component';
import { NewOrderComponent } from './retailer/new-order/new-order.component';
import { RegisteredItemComponent } from './retailer/registered-item/registered-item.component';
import { NewItemsComponent } from './retailer/new-items/new-items.component';
import { PreviousOrdersComponent } from './retailer/previous-orders/previous-orders.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerNavComponent } from './manager/manager-nav/manager-nav.component';
import { RegisterNewItemComponent } from './manager/register-new-item/register-new-item.component';
import { ItemServiceService } from './item/item-service.service';
import { DataStorageService } from './shared/data-storage.service';
import { ItemStockOrgComponent } from './item-stock-org/item-stock-org.component';
import { NewStockComponent } from './retailer/new-stock/new-stock.component';
import { RegisteredStockComponent } from './retailer/registered-stock/registered-stock.component';
import { StockComponent } from './stock/stock.component';
import { StockService } from './stock/stock.service';
import { RegisteredStockElementComponent } from './retailer/registered-stock/registered-stock-element/registered-stock-element.component';
import { NewItemElementComponent } from './retailer/new-items/items-to-select/new-item-element/new-item-element.component';
import { RegisteredItemElementComponent } from './retailer/registered-item/registered-item-element/registered-item-element.component';
import { ItemsToSelectComponent } from './retailer/new-items/items-to-select/items-to-select.component';
import { ItemsSelectedComponent } from './retailer/new-items/items-selected/items-selected.component';
import { NewItemElementSelectedComponent } from './retailer/new-items/items-selected/new-item-element-selected/new-item-element-selected.component';
import { RetailerItemsComponent } from './retailer/retailer-items/retailer-items.component';
import { RetailerStockComponent } from './retailer/retailer-stock/retailer-stock.component';
import { RetailerToSelectStocksComponent } from './retailer/new-stock/retailer-to-select-stocks/retailer-to-select-stocks.component';
import { RetailerSelectedStocksComponent } from './retailer/new-stock/retailer-selected-stocks/retailer-selected-stocks.component';
import { ToSelectStockElementComponent } from './retailer/new-stock/retailer-to-select-stocks/to-select-stock-element/to-select-stock-element.component';
import { StockElementComponent } from './retailer/new-stock/retailer-selected-stocks/stock-element/stock-element.component';
import { RetailerItemService } from './retailer/retailer-items/retailer-item.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterRetailerComponent,
    RetailerComponent,
    RetailerNavComponent,
    FotterComponent,
    HomeComponent,
    HomeNavComponent,
    CurrentOrdersComponent,
    ItemComponent,
    NewOrderComponent,
    RegisteredItemComponent,
    NewItemsComponent,
    PreviousOrdersComponent,
    ManagerComponent,
    ManagerNavComponent,
    RegisterNewItemComponent,
    ItemStockOrgComponent,
    RegisteredStockComponent,
    StockElementComponent,
    NewStockComponent,
    RegisteredStockElementComponent,
    NewItemElementComponent,
    RegisteredItemElementComponent,
    ItemsToSelectComponent,
    ItemsSelectedComponent,
    NewItemElementSelectedComponent,
    RetailerItemsComponent,
    RetailerStockComponent,
    RetailerToSelectStocksComponent,
    RetailerSelectedStocksComponent,
    ToSelectStockElementComponent,
    NewStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule
  ],
  providers: [ItemServiceService,DataStorageService,RetailerItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
