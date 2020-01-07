import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterRetailerComponent } from './home/register-retailer/register-retailer.component';
import { RetailerComponent } from './retailer/retailer.component';
import { HomeComponent } from './home/home.component';
import { CurrentOrdersComponent } from './retailer/current-orders/current-orders.component';
import { NewOrderComponent } from './retailer/new-order/new-order.component';
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


import { CompanyRequestsComponent } from './admin/company-requests/company-requests.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CompanyRegisteredComponent } from './admin/company-registered/company-registered.component';
import { RetailerDashboardComponent } from './retailer/retailer-dashboard/retailer-dashboard.component';
import { RetailerProfileComponent } from './retailer/retailer-profile/retailer-profile.component';
import { RetailerRegisteredCompaniesComponent } from './retailer/retailer-registered-companies/retailer-registered-companies.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { RegisterStockManagerComponent } from './manager/register-stock-manager/register-stock-manager.component';
import { RegisterSalesRepresentativeComponent } from './manager/sales-representative/register-sales-representative/register-sales-representative.component';
import { SalesRepresentativeComponent } from './manager/sales-representative/sales-representative.component';
import { CompanyRetailersComponent } from './manager/company-retailers/company-retailers.component';
import { RetailerNewCompaniesComponent } from './retailer/retailer-new-companies/retailer-new-companies.component';
import { StockManagerDashboardComponent } from './stock-manager/stock-manager-dashboard/stock-manager-dashboard.component';
import { StockManagerProfileComponent } from './stock-manager/stock-manager-profile/stock-manager-profile.component';
import { OrderFromCompanyComponent } from './retailer/new-order/order-from-company/order-from-company.component';
import { CurrentOrdersFromRetailersComponent } from './stock-manager/current-orders-from-retailers/current-orders-from-retailers.component';
import { ConfirmedOrdersOfRetailersComponent } from './stock-manager/confirmed-orders-of-retailers/confirmed-orders-of-retailers.component';
import { ManagerProfileComponent } from './manager/manager-profile/manager-profile.component';
import { ConfirmOrdersComponent } from './retailer/confirm-orders/confirm-orders.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RetailerGuardService } from './shared/routerGuards/retailer-guard.service';
import { StockManagerGuardService } from './shared/routerGuards/stock-manager-guard.service';
import { ManagerGuardService } from './shared/routerGuards/manager-guard.service';
import { AdminGuardService } from './shared/routerGuards/admin-guard.service';
import { CompanyPermisionGuardService } from './shared/routerGuards/company-permision-guard.service';
import { ValidEmailGuardService } from './shared/routerGuards/valid-email-guard.service';
import { TemporaryWelcomeComponent } from './home/temporary-welcome/temporary-welcome.component';
import { ResetPasswordService } from './shared/routerGuards/reset-password.service'; 
import { AssignedOrdersComponent } from './stock-manager/assigned-orders/assigned-orders.component';
import { StockManagerRetailersComponent } from './stock-manager/stock-manager-retailers/stock-manager-retailers.component';




const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
      {path: '', component: WelcomeComponent },
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterRetailerComponent}, 
      {path: 'registerCompany', component: RegisterDCompanyComponent} 
    ]},

  { path: 'retailer/:retailerId',component: RetailerComponent ,
        // canActivate: [RetailerGuardService],
        // canActivateChild:[ValidEmailGuardService], 
        children:[
            { path: '' , component: RetailerDashboardComponent},
            { path: 'currentOrders', component: CurrentOrdersComponent},
          
            { path: 'companies', component: NewOrderComponent},
            { path: 'confirmedOrders', component: ConfirmOrdersComponent},
            { path: 'companies/:companyId', component: OrderFromCompanyComponent, children:[
              { path: 'myCart', component: MyCartComponent},
             

            ]},
            // { path: 'myCart', component: MyCartComponent},
           
            {path: 'registredConpanies', component: RetailerRegisteredCompaniesComponent},
            { path: 'previousOrders', component: PreviousOrdersComponent},
            // {path: 'newStock', component: NewStockComponent},
            { path: 'allCompanies', component: RetailerNewCompaniesComponent},
            { path: 'myProfile', component: RetailerProfileComponent}
  ]},

  {path: 'stockManager/:id' , component: StockManagerComponent,
        // canActivate: [StockManagerGuardService],
        canActivateChild:[ResetPasswordService], 
        
        
        children:[
            { path: '', component: StockManagerDashboardComponent},
            { path: 'updateItems', component: UpdateItemsComponent},
            { path: 'myProfile', component: StockManagerProfileComponent},
            { path: 'requestsOrders',component: CurrentOrdersFromRetailersComponent},
            { path: 'confirmedOrders',component: ConfirmedOrdersOfRetailersComponent},
            { path: 'assignedOrders', component: AssignedOrdersComponent},
            { path: 'retailers', component: StockManagerRetailersComponent}
            
  ]},

  {path: 'manager/:id', component: ManagerComponent,
        // canActivate: [ManagerGuardService,CompanyPermisionGuardService],
        // canActivateChild:[ValidEmailGuardService],

        children:[
            {path: '' ,component :ManagerDashboardComponent},
            {path: 'registerStockManager' ,component :RegisterStockManagerComponent},
            {path: 'myProfile',  component : ManagerProfileComponent},
            {path: 'SalesRepresentative' ,component :SalesRepresentativeComponent,children:[
              {path:'registerSalesRepresentative',component:RegisterSalesRepresentativeComponent}
            ]},
              {path: 'newRetailers', component: CompanyRetailersComponent},
              {path: 'registerNewItem', component: RegisterNewItemComponent},
            {path: 'vehicleRegister', component: VehicleComponent,children:[
              {path: 'registerVehicle', component: VehicleRegisterComponent }
            ]},
            {path: 'registeredItems', component: RegisteredItemsComponent},
            { path: 'vehicle', component: VehicleComponent, children:[
              {path: 'register' , component: VehicleRegisterComponent}
              ]}
  ]},


  {path: 'admin/:id',
  //  canActivate: [AdminGuardService],
   component: AdminComponent, children:[
    { path: 'dashboard', component: AdminDashboardComponent},
    { path: 'companyRequests', component: CompanyRequestsComponent},
    { path: 'registeredCompanies', component:CompanyRegisteredComponent },
    { path: 'reports', component: AdminReportsComponent}
  ]},

  { path: 'temporaryWelcome/:type', component: TemporaryWelcomeComponent},   // this is for companies which are not permision granted

  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
