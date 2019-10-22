import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatModule } from './material.theme';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { LoginComponent } from './home/login/login.component';
import { RegisterRetailerComponent } from './home/register-retailer/register-retailer.component';
import { RetailerComponent } from './retailer/retailer.component';
import { RetailerNavComponent } from './retailer/retailer-nav/retailer-nav.component';
import { FotterComponent } from './fotter/fotter.component';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import { CurrentOrdersComponent } from './retailer/current-orders/current-orders.component';import { ItemComponent } from './item/item.component';
import { NewOrderComponent } from './retailer/new-order/new-order.component';
import { PreviousOrdersComponent } from './retailer/previous-orders/previous-orders.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerNavComponent } from './manager/manager-nav/manager-nav.component';
import { RegisterNewItemComponent } from './manager/register-new-item/register-new-item.component';
import { ItemStockOrgComponent } from './item-stock-org/item-stock-org.component';

import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AppComponent } from './app.component';


import { DataStorageService } from './shared/data-storage.service';
import { StockManagerComponent } from './stock-manager/stock-manager.component';
import { StockManagerNavComponent } from './stock-manager/stock-manager-nav/stock-manager-nav.component';
import { VehicleComponent } from './manager/vehicle/vehicle.component';



import { AuthenticationService } from './service/authentication.service';
import { FormsModule } from '@angular/forms';
import { ItemService } from './service/item.service';
import { RegisteredItemsComponent } from './manager/registered-items/registered-items.component';
import { RegItemElementComponent } from './manager/registered-items/reg-item-element/reg-item-element.component';
import { RegisterDCompanyComponent } from './home/register-d-company/register-d-company.component';
import { UpdateItemsComponent } from './stock-manager/update-items/update-items.component';
import { UpdateItemElementComponent } from './stock-manager/update-items/update-item-element/update-item-element.component';
import { VehicleRegisterComponent } from './manager/vehicle/vehicle-register/vehicle-register.component';
import { MyCartComponent } from './retailer/my-cart/my-cart.component';
import { CartItemElemetComponent } from './retailer/my-cart/cart-item-elemet/cart-item-elemet.component';
import { UserService } from './service/user.service';
import { OrderService } from './service/order.service';
import { AngularFireAuthGuard } from './auth-guard';
import { from } from 'rxjs';
import { VehicleService } from './service/vehicle.service';
import { VehicleDisplayComponent } from './manager/vehicle/vehicle-display/vehicle-display.component';
import { CompanyRequestsComponent } from './admin/company-requests/company-requests.component';
import { AdminComReqElementComponent } from './admin/company-requests/admin-com-req-element/admin-com-req-element.component';
import { CompanyService } from './service/company.service';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CompanyRegisteredComponent } from './admin/company-registered/company-registered.component';
import { AdminComRegElemetComponent } from './admin/company-registered/admin-com-reg-elemet/admin-com-reg-elemet.component';
import { RetailerDashboardComponent } from './retailer/retailer-dashboard/retailer-dashboard.component';
import { RetailerRegisteredCompaniesComponent } from './retailer/retailer-registered-companies/retailer-registered-companies.component';
import { RetailerNewCompaniesComponent } from './retailer/retailer-new-companies/retailer-new-companies.component';
import { RetailerProfileComponent } from './retailer/retailer-profile/retailer-profile.component';
import { RetailerService } from './service/retailer.service';
import { RetRegComElementComponent } from './retailer/retailer-registered-companies/ret-reg-com-element/ret-reg-com-element.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RetOrdCompElementComponent } from './retailer/new-order/ret-ord-comp-element/ret-ord-comp-element.component';
import { NewOrderItemElemetComponent } from './retailer/new-order/ret-ord-comp-element/new-order-item-elemet/new-order-item-elemet.component';
import { DialogOverviewExampleDialogComponent } from './home/login/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { RegisterStockManagerComponent } from './manager/register-stock-manager/register-stock-manager.component';
import { SalesRepresentativeComponent } from './manager/sales-representative/sales-representative.component';
import { RegisterSalesRepresentativeComponent } from './manager/sales-representative/register-sales-representative/register-sales-representative.component';


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
    PreviousOrdersComponent,
    ManagerComponent,
    ManagerNavComponent,
    RegisterNewItemComponent,
    ItemStockOrgComponent,
    AdminComponent,
    AdminNavComponent,
    AdminReportsComponent,
    StockManagerComponent,
    StockManagerNavComponent,
    VehicleComponent,
    RegisteredItemsComponent,
    RegItemElementComponent,
    RegisterDCompanyComponent,
    UpdateItemsComponent,
    UpdateItemElementComponent,
    VehicleRegisterComponent,
    MyCartComponent,
    CartItemElemetComponent,
    VehicleDisplayComponent,
    CompanyRequestsComponent,
    AdminComReqElementComponent,
    ManagerDashboardComponent,
    AdminDashboardComponent,
    CompanyRegisteredComponent,
    AdminComRegElemetComponent,
    RetailerDashboardComponent,
    RetailerRegisteredCompaniesComponent,
    RetailerNewCompaniesComponent,
    RetailerProfileComponent,
    RetRegComElementComponent,
    PageNotFoundComponent,
    RetOrdCompElementComponent,
    NewOrderItemElemetComponent,
    DialogOverviewExampleDialogComponent,
    WelcomeComponent,
    RegisterStockManagerComponent,
    SalesRepresentativeComponent,
    RegisterSalesRepresentativeComponent,
  
  ], 
  entryComponents:[
    DialogOverviewExampleDialogComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase,'vinora'),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthenticationService,
    ItemService,
    DataStorageService,
    UserService,
    OrderService,
    AngularFireAuthGuard,
    VehicleService,
    CompanyService,
    RetailerService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
