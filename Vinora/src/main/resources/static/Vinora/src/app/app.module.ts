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
import { CurrentOrdersComponent } from './retailer/current-orders/current-orders.component';
import { ItemListComponent } from './home/register-retailer/item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { EditListComponent } from './home/register-retailer/edit-list/edit-list.component';
import { ItemFormComponent } from './home/register-retailer/item-form/item-form.component';
import { NewOrderComponent } from './retailer/new-order/new-order.component';
import { RegisteredItemComponent } from './retailer/registered-item/registered-item.component';
import { NewItemsComponent } from './retailer/new-items/new-items.component';
import { PreviousOrdersComponent } from './retailer/previous-orders/previous-orders.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerNavComponent } from './manager/manager-nav/manager-nav.component';
import { RegisterNewItemComponent } from './manager/register-new-item/register-new-item.component';
import { ItemServiceService } from './item/item-service.service';
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
    ItemListComponent,
    ItemComponent,
    EditListComponent,
    ItemFormComponent,
    NewOrderComponent,
    RegisteredItemComponent,
    NewItemsComponent,
    PreviousOrdersComponent,
    ManagerComponent,
    ManagerNavComponent,
    RegisterNewItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule
  ],
  providers: [ItemServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
