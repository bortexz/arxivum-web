// ANGULAR 2 IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// LOGIN
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';

import { routing } from './app.routes';
import { LoginComponent } from './components/login/login.component';


// ADMIN PAGES
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminPageGuard } from './pages/admin-page/admin-page.guard';

import { AdminDashboardPageComponent } from './pages/admin-page/admin-dashboard-page/admin-dashboard-page.component';
import { AdminUsersPageComponent } from './pages/admin-page/admin-users-page/admin-users-page.component';
import { AdminFilesPageComponent } from './pages/admin-page/admin-files-page/admin-files-page.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageGuard } from './pages/home-page/home-page.guard';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UsersService } from './services/users/users.service';

import ArxivumHttpProvider from './utils/http/arxivum-http.service.provider';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { UPLOAD_DIRECTIVES } from 'ng2-uploader';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    LoginComponent,
    AdminPageComponent,
    HomePageComponent,
    AdminSidebarComponent,
    AdminDashboardPageComponent,
    AdminUsersPageComponent,
    AdminFilesPageComponent,
    FileUploadComponent,
    UPLOAD_DIRECTIVES
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
    HomePageGuard,
    LoginPageGuard,
    AdminPageGuard,
    ArxivumHttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
