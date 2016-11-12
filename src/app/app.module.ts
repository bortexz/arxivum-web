import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { routing } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UsersService } from './services/users/users.service';

import ArxivumHttpProvider from './utils/http/arxivum-http.service.provider';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    LoginComponent,
    AdminPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthenticationService,
    UsersService,
    ArxivumHttpProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
