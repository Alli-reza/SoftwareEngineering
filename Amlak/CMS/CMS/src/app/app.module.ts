import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/modules/material.module';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth/auth.service';
import { HelperService } from './shared/services/Helper.service';
import { HttpService } from './shared/services/http-service.service';
import { SpinnerLoaderModule } from './shared/modules/spinner-loader/spinner-loader.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { HttpInterceptorProviders } from './shared/InterceptorProvider';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { EstatesComponent } from './estates/estates.component';
import { EstateDetailsComponent } from './estates/estate-details/estate-details.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { MyEstateComponent } from './my-estate/my-estate.component';
import { RemoveModalComponent } from './shared/components/remove-modal/remove-modal.component';
import { HelperPipesModule } from './shared/pipes/helper-pipes.module';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    AdminProfileComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    EstatesComponent,
    EstateDetailsComponent,
    ContractsComponent,
    ContractDetailsComponent,
    MyEstateComponent,
    RemoveModalComponent,
    AboutUsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SpinnerLoaderModule,
    HelperPipesModule
  ],
  providers: [
    CookieService,
    AuthService,
    AuthGuard,
    HttpInterceptorProviders,
    HelperService,
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

function tokenGetter() {
  var name = 'CMS_AMLK_Token' + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
