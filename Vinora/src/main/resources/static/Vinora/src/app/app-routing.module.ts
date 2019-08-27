import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterRetailerComponent } from './home/register-retailer/register-retailer.component';
import { RetailerComponent } from './retailer/retailer.component';
import { HomeComponent } from './home/home.component';
import { CurrentOrdersComponent } from './retailer/current-orders/current-orders.component';
import { ItemFormComponent } from './home/register-retailer/item-form/item-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterRetailerComponent},
      {path: 'register/itemList', component: ItemFormComponent} 
    ]},
  {path: 'retailer',component: RetailerComponent, children:[
    {path: 'currentOrders', component: CurrentOrdersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
