// ANGULAR 2 IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Clarity Import
import { ClarityModule } from 'clarity-angular';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

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
import { FoldersService } from './services/folders/folders.service';
import { FilesService } from './services/files/files.service';

import ArxivumHttpProvider from './utils/http/arxivum-http.service.provider';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { Ng2UploaderModule } from 'ng2-uploader';
import { FilesPageComponent } from './pages/files-page/files-page.component';

import { RootFolderResolver } from './services/folders/root.resolver';
import { FolderResolver } from './services/folders/folder.resolver';
import { CreateFolderWizardComponent } from './wizards/create-folder-wizard/create-folder-wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    LoginComponent,
    AdminPageComponent,
    HomePageComponent,
    AdminSidebarComponent,
    AdminDashboardPageComponent,
    AdminUsersPageComponent,
    AdminFilesPageComponent,
    FileUploadComponent,
    FilesPageComponent,
    CreateFolderWizardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule,
    Ng2UploaderModule,
    routing
  ],
  providers: [
    AuthenticationService,
    UsersService,
    FoldersService,
    FilesService,
    HomePageGuard,
    LoginPageGuard,
    AdminPageGuard,
    ArxivumHttpProvider,
    RootFolderResolver,
    FolderResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
