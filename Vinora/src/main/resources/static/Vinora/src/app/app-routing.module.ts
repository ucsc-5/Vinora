import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterRetailerComponent } from './home/register-retailer/register-retailer.component';
import { RetailerComponent } from './retailer/retailer.component';
import { HomeComponent } from './home/home.component';
import { CurrentOrdersComponent } from './retailer/current-orders/current-orders.component';
import { NewOrderComponent } from './retailer/new-order/new-order.component';
import { RegisteredItemComponent } from './retailer/registered-item/registered-item.component';
import { NewItemsComponent } from './retailer/new-items/new-items.component';
import { PreviousOrdersComponent } from './retailer/previous-orders/previous-orders.component';
import { ManagerComponent } from './manager/manager.component';
import { RegisterNewItemComponent } from './manager/register-new-item/register-new-item.component';
import { RegisteredStockComponent } from './retailer/registered-stock/registered-stock.component';
import { NewStockComponent } from './retailer/new-stock/new-stock.component';
import { AdminComponent } from './admin/admin.component';
import { AdminRegisterStocksComponent } from './admin/admin-register-stocks/admin-register-stocks.component';
import { AdminSurrentStocksComponent } from './admin/admin-surrent-stocks/admin-surrent-stocks.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { StockManagerComponent } from './stock-manager/stock-manager.component';
import { VehicleComponent } from './manager/vehicle/vehicle.component';
import { RegisteredItemsComponent } from './manager/registered-items/registered-items.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterRetailerComponent} 
    ]},
  {path: 'retailer/:id',component: RetailerComponent, children:[
    {path: 'currentOrders', component: CurrentOrdersComponent},
    {path: 'newOrder', component: NewOrderComponent},
    {path: 'registeredItems', component: RegisteredItemComponent},
    {path: 'newItems', component: NewItemsComponent},
    {path: 'previousOrder', component: PreviousOrdersComponent},
    {path: 'registeredStocks', component: RegisteredStockComponent},
    {path: 'newStock', component: NewStockComponent}
  ]},

  {path: 'stockManager/:id' , component: StockManagerComponent},

  {path: 'manager/:id', component: ManagerComponent, children:[
    {path: 'registerNewItem', component: RegisterNewItemComponent},
    {path: 'vehicleRegister', component: VehicleComponent},
    {path: 'registeredItems', component: RegisteredItemsComponent},
  ]},

  {path: 'admin', component: AdminComponent, children:[
    {path: 'registerStock', component: AdminRegisterStocksComponent},
    {path: 'currentStocks', component: AdminSurrentStocksComponent},
    {path: 'reports', component: AdminReportsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
