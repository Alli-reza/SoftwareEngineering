import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { ContractsComponent } from './contracts/contracts.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstateDetailsComponent } from './estates/estate-details/estate-details.component';
import { EstatesComponent } from './estates/estates.component';
import { MyEstateComponent } from './my-estate/my-estate.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contracts',
    component: ContractsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contracts/:id',
    component: ContractDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estates',
    component: EstatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estates/:id',
    component: EstateDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-estate',
    component: MyEstateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'authenticate',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
