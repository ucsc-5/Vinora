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
import { AgmCoreModule } from '@agm/core';
import { MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatButtonModule} from '@angular/material/button'; 

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
import { RetRegComElementComponent } from './retailer/retailer-new-companies/ret-reg-com-element/ret-reg-com-element.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RetOrdCompElementComponent } from './retailer/new-order/ret-ord-comp-element/ret-ord-comp-element.component';
import { NewOrderItemElemetComponent } from './retailer/new-order/ret-ord-comp-element/new-order-item-elemet/new-order-item-elemet.component';
import { DialogOverviewExampleDialogComponent } from './home/login/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { RegisterStockManagerComponent } from './manager/register-stock-manager/register-stock-manager.component';
import { SalesRepresentativeComponent } from './manager/sales-representative/sales-representative.component';
import { RegisterSalesRepresentativeComponent } from './manager/sales-representative/register-sales-representative/register-sales-representative.component';
import { DisplaySalesRepresentativeComponent } from './manager/sales-representative/display-sales-representative/display-sales-representative.component';
import { CompanyRetailersComponent } from './manager/company-retailers/company-retailers.component';
import { RetRegCompanyElementComponent } from './retailer/retailer-registered-companies/ret-reg-company-element/ret-reg-company-element.component';
import { StockManagerService } from './service/stock-manager.service';
import { StockManagerDashboardComponent } from './stock-manager/stock-manager-dashboard/stock-manager-dashboard.component';
import { StockManagerProfileComponent } from './stock-manager/stock-manager-profile/stock-manager-profile.component';
import { OrderFromCompanyComponent } from './retailer/new-order/order-from-company/order-from-company.component';
import { OrderItemElementComponent } from './retailer/new-order/order-from-company/order-item-element/order-item-element.component';
import { OrderSummeryComponent } from './retailer/new-order/order-from-company/order-summery/order-summery.component';
import { ConfirmDialogComponent } from './shared/popups/confirm-dialog/confirm-dialog.component';
import { DialogService } from './service/dialog.service';
import { CartService } from './service/cart.service';
import { CurrentOrderElementComponent } from './retailer/current-orders/current-order-element/current-order-element.component';
import { CurrentItemElemetComponent } from './retailer/current-orders/current-order-element/current-item-elemet/current-item-elemet.component';
import { CurrentOrdersFromRetailersComponent } from './stock-manager/current-orders-from-retailers/current-orders-from-retailers.component';
import { CurOrderElementComponent } from './stock-manager/current-orders-from-retailers/cur-order-element/cur-order-element.component';
import { StmCrtOrderItemElemetComponent } from './stock-manager/current-orders-from-retailers/cur-order-element/stm-crt-order-item-elemet/stm-crt-order-item-elemet.component';
import { ConfirmedOrdersOfRetailersComponent } from './stock-manager/confirmed-orders-of-retailers/confirmed-orders-of-retailers.component';
import { ConOrderElementComponent } from './stock-manager/confirmed-orders-of-retailers/con-order-element/con-order-element.component';
import { StmConOrderElementComponent } from './stock-manager/confirmed-orders-of-retailers/con-order-element/stm-con-order-element/stm-con-order-element.component';
import { ManagerProfileComponent } from './manager/manager-profile/manager-profile.component';
import { EqualValidatorDirective } from './shared/equal-validator.directive';
import { ErrorDialogComponent } from './shared/popups/error-dialog/error-dialog.component';
import { DisplayStockManagerComponent } from './manager/register-stock-manager/display-stock-manager/display-stock-manager.component';
import { ConfirmOrdersComponent } from './retailer/confirm-orders/confirm-orders.component';
import { ConfirmOrderElementComponent } from './retailer/confirm-orders/confirm-order-element/confirm-order-element.component';
import { ConfirmOrderItemComponent } from './retailer/confirm-orders/confirm-order-element/confirm-order-item/confirm-order-item.component';
import { RetailerGuardService } from './shared/routerGuards/retailer-guard.service';
import { SaleRepGuardService } from './shared/routerGuards/sale-rep-guard.service';
import { StockManagerGuardService } from './shared/routerGuards/stock-manager-guard.service';
import { AdminGuardService } from './shared/routerGuards/admin-guard.service';
import { ManagerGuardService } from './shared/routerGuards/manager-guard.service';
import { CompanyPermisionGuardService } from './shared/routerGuards/company-permision-guard.service';
import { WelcomeNewCompanyComponent } from './manager/welcome-new-company/welcome-new-company.component';
import { ValidEmailGuardService } from './shared/routerGuards/valid-email-guard.service';
import { TemporaryWelcomeComponent } from './home/temporary-welcome/temporary-welcome.component';
import { ConfirmItemPopupComponent } from './shared/popups/confirm-item-popup/confirm-item-popup.component';
import { MatDialogModule,MatNativeDateModule } from '@angular/material';
import { StmConfirmOrderTempService } from './service/stm-confirm-order-temp.service';
import { ItemDetailsPopupComponent } from './shared/popups/item-details-popup/item-details-popup.component';
import { ResetPasswordService } from './shared/routerGuards/reset-password.service';
import { ResetPasswordPopupComponent } from './shared/popups/reset-password-popup/reset-password-popup.component';
import { SalesRepresentativeService } from './service/sales-representative.service';
import { AssignedOrdersComponent } from './stock-manager/assigned-orders/assigned-orders.component';
import { AsiignedOrderDetailsComponent } from './stock-manager/assigned-orders/asiigned-order-details/asiigned-order-details.component';
import { StockManagerRetailersComponent } from './stock-manager/stock-manager-retailers/stock-manager-retailers.component';
import { RetailerRegComElementComponent } from './retailer/previous-orders/retailer-reg-com-element/retailer-reg-com-element.component';
import { ReportComponent } from './retailer/previous-orders/report/report.component';
import { StmRetailerListElementComponent } from './stock-manager/stock-manager-retailers/stm-retailer-list-element/stm-retailer-list-element.component';
import { ReportConfirmOrderElementComponent } from './retailer/previous-orders/report/report-confirm-order-element/report-confirm-order-element.component';
import { ReportConfirmOrderItemComponent } from './retailer/previous-orders/report/report-confirm-order-element/report-confirm-order-item/report-confirm-order-item.component';
import { RetailerProfileForSTMComponent } from './stock-manager/stock-manager-retailers/retailer-profile-for-stm/retailer-profile-for-stm.component';
import { RetailerOrdersForSTMComponent } from './stock-manager/stock-manager-retailers/retailer-dashboard-for-stm/retailer-orders-for-stm/retailer-orders-for-stm.component';
import { RetailerDashboardForSTMComponent } from './stock-manager/stock-manager-retailers/retailer-dashboard-for-stm/retailer-dashboard-for-stm.component';
import { StmCompanyProfileComponent } from './stock-manager/stm-company-profile/stm-company-profile.component';
import { CompanyMainStockComponent } from './stock-manager/company-main-stock/company-main-stock.component';
import { UpdateItemDetailsComponent } from './stock-manager/update-items/update-item-element/update-item-details/update-item-details.component';
import { RegisteredRetailersComponent } from './registered-retailers/registered-retailers.component';
import { CompanyRegisteredRetailersComponent } from './manager/company-retailers/company-registered-retailers/company-registered-retailers.component';
import { CompanyNotRegisteredRetailersComponent } from './manager/company-retailers/company-not-registered-retailers/company-not-registered-retailers.component';
import { ConfirmOrdersSearchComponent } from './stock-manager/confirm-orders-search/confirm-orders-search.component';
import { StmComSalerepsComponent } from './stock-manager/stm-com-salereps/stm-com-salereps.component';
import { StmSalerepDetailsComponent } from './stock-manager/stm-com-salereps/stm-salerep-details/stm-salerep-details.component';
import { DatePipe } from '@angular/common';
import { DeliveryCompanyReportComponent } from './retailer/delivery-company-report/delivery-company-report.component';
import { RegDeComElementComponent } from './retailer/delivery-company-report/reg-de-com-element/reg-de-com-element.component';
import { StmUpdateTepnumComponent } from './stock-manager/stock-manager-profile/stm-update-tepnum/stm-update-tepnum.component';
import { ReportByItemComponent } from './retailer/report-by-item/report-by-item.component';
import { ReturnGoodsComponent } from './stock-manager/return-goods/return-goods.component';
import { ReturnGoodRetailerComponent } from './stock-manager/return-goods/return-good-retailer/return-good-retailer.component';
import { ReturnGoodsService } from './service/return-goods.service';
import { ReportByItemElementComponent } from './retailer/report-by-item/report-by-item-element/report-by-item-element.component';
import { ItemReportComponent } from './retailer/report-by-item/item-report/item-report.component';
import { ConfirmedOrderResultReportComponent } from './stock-manager/confirm-orders-search/confirmed-order-result-report/confirmed-order-result-report.component';

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
    DisplaySalesRepresentativeComponent,
    CompanyRetailersComponent,
    RetRegCompanyElementComponent,
    StockManagerDashboardComponent,
    StockManagerProfileComponent,
    OrderFromCompanyComponent,
    OrderItemElementComponent,
    OrderSummeryComponent,
    ConfirmDialogComponent,
    CurrentOrderElementComponent,
    CurrentItemElemetComponent,
    CurrentOrdersFromRetailersComponent,
    CurOrderElementComponent,
    StmCrtOrderItemElemetComponent,
    ConfirmedOrdersOfRetailersComponent,
    ConOrderElementComponent,
    StmConOrderElementComponent,
    ManagerProfileComponent,
    EqualValidatorDirective,
    ErrorDialogComponent,
    DisplayStockManagerComponent,
    ConfirmOrdersComponent,
    ConfirmOrderElementComponent,
    ConfirmOrderItemComponent,
    WelcomeNewCompanyComponent,
    TemporaryWelcomeComponent,
    ConfirmItemPopupComponent,
    ItemDetailsPopupComponent,
    ResetPasswordPopupComponent,
    AssignedOrdersComponent,
    AsiignedOrderDetailsComponent,
    StockManagerRetailersComponent,
    RetailerRegComElementComponent,
    ReportComponent,
    StmRetailerListElementComponent,
    ReportConfirmOrderElementComponent,
    ReportConfirmOrderItemComponent,
    RetailerProfileForSTMComponent,
    RetailerOrdersForSTMComponent,
    RetailerDashboardForSTMComponent,
    StmCompanyProfileComponent,
    CompanyMainStockComponent,
    UpdateItemDetailsComponent,
    RegisteredRetailersComponent,
    CompanyRegisteredRetailersComponent,
    CompanyNotRegisteredRetailersComponent,
    ConfirmOrdersSearchComponent,
    StmComSalerepsComponent,
    StmSalerepDetailsComponent,
    DeliveryCompanyReportComponent,
    RegDeComElementComponent,
    StmUpdateTepnumComponent,
    ReportByItemComponent,
    ReturnGoodsComponent,
    ReturnGoodRetailerComponent,
    ReportByItemElementComponent,
    ItemReportComponent,
    ConfirmedOrderResultReportComponent,
  ], 
  entryComponents:[
    DialogOverviewExampleDialogComponent,
    ConfirmDialogComponent,
    ConfirmItemPopupComponent,
    ItemDetailsPopupComponent,
    ResetPasswordPopupComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase,'vinora'),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhDflq5iJrXIcKpeq0IzLQPQpOboX91lY'
    })
  ],
  providers: [
    AuthenticationService,
    ItemService,
    UserService,
    OrderService,
    VehicleService,
    CompanyService,
    RetailerService,
    StockManagerService,
    DialogService,
    CartService,
    RetailerGuardService,
    SaleRepGuardService,
    StockManagerGuardService,
    AdminGuardService,
    ManagerGuardService,
    CompanyPermisionGuardService,
    ValidEmailGuardService,
    ResetPasswordService,
    StmConfirmOrderTempService,
    SalesRepresentativeService,
    DatePipe,
    ReturnGoodsService,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
    ],
  bootstrap: [
    AppComponent
  ]
  
})
export class AppModule { }
