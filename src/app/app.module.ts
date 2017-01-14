import { UploaderActions } from './services/uploader/uploader.actions';
import { UploaderEffects } from './services/uploader/uploader.effects';
import { FoldersEffects } from './services/folders/folders.effects';
import { FoldersActions } from './services/folders/folders.actions';
import { FilesPageGuard } from './pages/files-page/files-page.guard';
import ArxivumHttpProvider from './utils/http/arxivum-http.service.provider';
import { ArxivumHttp } from './utils/http/arxivum-http.service';
import { AppComponent } from './app.component';
import { reducers } from './app.reducers';
import { routing } from './app.routes';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { FoldersBreadcrumbComponent } from './components/folders-breadcrumb/folders-breadcrumb.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { FilesPageComponent } from './pages/files-page/files-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';
import { AuthenticationActions } from './services/authentication/authentication.actions';
import { AuthenticationEffects } from './services/authentication/authentication.effects';
import { AuthenticationService } from './services/authentication/authentication.service';
import { FileDownloaderService } from './services/file-downloader/file-downloader.service';
import { UploaderService } from './services/uploader/uploader.service';
import { FilesService } from './services/files/files.service';
import { FoldersService } from './services/folders/folders.service';
import { UsersService } from './services/users/users.service';
import { FilesizePipe } from './utils/file-size/filesize.pipe';
import { CreateFolderWizardComponent } from './components/create-folder-wizard/create-folder-wizard.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreeModule } from 'angular2-tree-component';
import { ClarityModule } from 'clarity-angular';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    LoginComponent,
    FilesPageComponent,
    CreateFolderWizardComponent,
    FileTreeComponent,
    FoldersBreadcrumbComponent,
    RightSidebarComponent,
    FilesizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule,
    TreeModule,
    FileUploadModule,
    routing,
    // Store
    StoreModule.provideStore(reducers),
    // Effects
    EffectsModule.run(AuthenticationEffects),
    EffectsModule.run(FoldersEffects),
    EffectsModule.run(UploaderEffects)
  ],
  providers: [
    AuthenticationService,
    UsersService,
    FoldersService,
    FilesService,
    LoginPageGuard,
    ArxivumHttpProvider,
    UploaderService,
    FileDownloaderService,
    AuthenticationActions,
    FilesPageGuard,
    FoldersActions,
    UploaderActions
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
