import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { CompanyComponent } from './components/company/company.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: "profile", component: ProfileComponent},
  {path: "charts/:stockTicker", component: ChartComponent},
  {path: "company/:stockTicker", component: CompanyComponent},
  {path: "orders", component: OrderListComponent},
  {path: "dashboard", component: DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
