import { InvitationsEffects } from './core/invitations/invitations.effects';
import { InvitationsService } from './core/invitations/invitations.service';
import { UsersService } from './core/users/users.service';
import { UsersPageService } from './pages/users-page/users-page.service';
import { RegisterComponent } from './components/register/register.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PlayerEffects } from './core/player/player.effects';
import { PlayerPageGuard } from './pages/player-page/player-page.guard';
import { UploadsPageGuard } from './pages/files-page/uploads-page/uploads-page.guard';
import { DownloaderEffects } from './core/downloader/downloader.effects';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { InputModalComponent } from './components/modals/input-modal/input-modal.component';
import { DownloaderService } from './core/downloader/downloader.service';
import { UploaderEffects } from './core/uploader/uploader.effects';
import { UploaderService } from './core/uploader/uploader.service';
import { ModalsComponent } from './components/modals/modals.component';
import { FoldersBreadcrumbComponent } from './components/folders-breadcrumb/folders-breadcrumb.component';
import { FilesizePipe } from './utils/file-size/filesize.pipe';
import { FoldersEffects } from './core/folders/folders.effects';
import { AuthInterceptor } from './utils/http/auth.interceptor';
import { LoginPageService } from './pages/login-page/login-page.service';
import { HeaderService } from './components/header/header.service';
import { HeaderComponent } from './components/header/header.component';
import { FilesPageService } from './pages/files-page/files-page.service';
import { FilesPageGuard } from './pages/files-page/files-page.guard';
// import { InvitationsService } from './core/invitations/invitations.service';
import { LoginPageGuard } from './pages/login-page/login-page.guard';
import { FilesService } from './core/files/files.service';
import { FoldersService } from './core/folders/folders.service';
// import { UsersService } from './core/users/users.service';
import { AuthenticationService } from './core/authentication/authentication.service';
import { AuthenticationEffects } from './core/authentication/authentication.effects';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './app.reducers';
import { StoreModule } from '@ngrx/store';
import { routing } from './app.routes';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { ClarityModule } from 'clarity-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FilesPageComponent } from './pages/files-page/files-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListPageComponent } from './pages/files-page/list-page/list-page.component';
import { DownloadsPageComponent } from './pages/files-page/downloads-page/downloads-page.component';
import { UploadsPageComponent } from './pages/files-page/uploads-page/uploads-page.component';
import { PlayerPageComponent } from './pages/player-page/player-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { RegisteredPageComponent } from './pages/users-page/registered-page/registered-page.component';
import { InvitationsPageComponent } from './pages/users-page/invitations-page/invitations-page.component';
import { UpdateUserPageComponent } from './pages/update-user-page/update-user-page.component';
import { AppNotificationsComponent } from './components/app-notifications/app-notifications.component';
// import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    LoginFormComponent,
    FilesPageComponent,
    FoldersBreadcrumbComponent,
    RegisterPageComponent,
    RegisterComponent,
    FilesizePipe,

    // Modals
    ModalsComponent,
    InputModalComponent,
    ConfirmationModalComponent,


    ListPageComponent,
    DownloadsPageComponent,
    UploadsPageComponent,
    PlayerPageComponent,
    UsersPageComponent,
    RegisteredPageComponent,
    InvitationsPageComponent,
    UpdateUserPageComponent,
    AppNotificationsComponent
  ],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      FoldersEffects,
      UploaderEffects,
      DownloaderEffects,
      PlayerEffects,
      InvitationsEffects
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClarityModule.forRoot(),
    FileUploadModule,
    routing,
    // Store

    // StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthenticationService,
    // UsersService,
    FoldersService,
    FilesService,
    LoginPageGuard,
    UploaderService,
    DownloaderService,
    // InvitationsService,
    FilesPageGuard,
    UploadsPageGuard,
    PlayerPageGuard,
    FilesPageService,
    HeaderService,
    LoginPageService,
    UsersService,
    UsersPageService,
    InvitationsService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
