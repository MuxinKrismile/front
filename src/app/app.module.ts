import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './page/login/login.component';
import {RegisterComponent} from './page/register/register.component';
import {HeaderComponent} from './page/frame/header/header.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './service/auth.service';
import {CommonService} from './service/common.service';
import {AuthInterceptor} from './service/auth-interceptor';
import {CompanyService} from './service/company.service';
import {PersonModal} from './page/company/modals/person.modal';
import {TreeModule} from './chart/tree/tree.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    PersonModal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TreeModule,
  ],
  providers: [
    AuthService,
    CompanyService,
    CommonService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  entryComponents: [
    PersonModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
