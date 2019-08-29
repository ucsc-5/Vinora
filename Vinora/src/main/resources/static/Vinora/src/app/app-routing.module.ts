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

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterRetailerComponent} 
    ]},
  {path: 'retailer',component: RetailerComponent, children:[
    {path: 'currentOrders', component: CurrentOrdersComponent},
    {path: 'newOrder', component: NewOrderComponent},
    {path: 'registerItems', component: RegisteredItemComponent},
    {path: 'newItems', component: NewItemsComponent},
    {path: 'previousOrder', component: PreviousOrdersComponent}
  ]},
  {path: 'manager', component: ManagerComponent, children:[
    {path: 'registerNewItem', component: RegisterNewItemComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
