import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterRetailerComponent } from './home/register-retailer/register-retailer.component';
import { RetailerComponent } from './retailer/retailer.component';
import { HomeComponent } from './home/home.component';
import { CurrentOrdersComponent } from './retailer/current-orders/current-orders.component';
import { NewOrderComponent } from './retailer/new-order/new-order.component';
import { NewItemsComponent } from './retailer/new-items/new-items.component';
import { PreviousOrdersComponent } from './retailer/previous-orders/previous-orders.component';
import { ManagerComponent } from './manager/manager.component';
import { RegisterNewItemComponent } from './manager/register-new-item/register-new-item.component';
import { AdminComponent } from './admin/admin.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { StockManagerComponent } from './stock-manager/stock-manager.component';
import { VehicleComponent } from './manager/vehicle/vehicle.component';
import { RegisteredItemsComponent } from './manager/registered-items/registered-items.component';
import { RegisterDCompanyComponent } from './home/register-d-company/register-d-company.component';
import { UpdateItemsComponent } from './stock-manager/update-items/update-items.component';
import { VehicleRegisterComponent } from './manager/vehicle/vehicle-register/vehicle-register.component';
import { MyCartComponent } from './retailer/my-cart/my-cart.component';


import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { CompanyRequestsComponent } from './admin/company-requests/company-requests.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CompanyRegisteredComponent } from './admin/company-registered/company-registered.component';
import { RetailerDashboardComponent } from './retailer/retailer-dashboard/retailer-dashboard.component';


const retailerOnly = hasCustomClaim('retailer');
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = redirectLoggedInTo(['items']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterRetailerComponent}, 
      {path: 'registerCompany', component: RegisterDCompanyComponent} 
    ]},
  {path: 'retailer/:id',component: RetailerComponent, children:[
    {path: '' , component: RetailerDashboardComponent},
    {path: 'currentOrders', component: CurrentOrdersComponent},
    {path: 'newOrder', component: NewOrderComponent},
    {path: 'newItems', component: NewItemsComponent},
    {path: 'previousOrder', component: PreviousOrdersComponent},
    // {path: 'registeredStocks', component: RegisteredStockComponent},
    // {path: 'newStock', component: NewStockComponent},
    {path: 'myCart', component: MyCartComponent}
  ]},

  {path: 'stockManager/:id' , component: StockManagerComponent, children:[
    { path: 'updateItems', component: UpdateItemsComponent}
    
  ]},

  {path: 'manager/:id', component: ManagerComponent, children:[
    {path: '' ,component :ManagerDashboardComponent},
    {path: 'registerNewItem', component: RegisterNewItemComponent},
    {path: 'vehicleRegister', component: VehicleComponent,children:[
      {path: 'registerVehicle', component: VehicleRegisterComponent }
    ]},
    {path: 'registeredItems', component: RegisteredItemsComponent},
    { path: 'vehicle', component: VehicleComponent, children:[
      {path: 'register' , component: VehicleRegisterComponent}
      ]}
  ]},

  {path: 'admin/:id', component: AdminComponent, children:[
    { path: '', component: AdminDashboardComponent},
    { path: 'companyRequests', component: CompanyRequestsComponent},
    { path: 'registeredCompanies', component:CompanyRegisteredComponent },
    { path: 'reports', component: AdminReportsComponent}
  ]},


  // { path: '',      component: AppComponent },
    // { path: 'login', component: LoginComponent,        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
    // { path: 'items', component: ItemListComponent,     canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    // { path: 'admin', component: AdminComponent,        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }},
    // { path: 'accounts/:id', component: AdminComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: belongsToAccount }}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
