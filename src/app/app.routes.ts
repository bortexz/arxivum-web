import { UpdateUserPageComponent } from './pages/update-user-page/update-user-page.component';
import { InvitationsPageComponent } from './pages/users-page/invitations-page/invitations-page.component';
import { RegisteredPageComponent } from './pages/users-page/registered-page/registered-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PlayerPageGuard } from './pages/player-page/player-page.guard';
import { PlayerPageComponent } from './pages/player-page/player-page.component';
import { UploadsPageGuard } from './pages/files-page/uploads-page/uploads-page.guard';
import { UploadsPageComponent } from './pages/files-page/uploads-page/uploads-page.component';
import { DownloadsPageComponent } from './pages/files-page/downloads-page/downloads-page.component';
import { ListPageComponent } from './pages/files-page/list-page/list-page.component';
// import { AdminPageComponent } from './pages/admin-page/admin-page.component';
// import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FilesPageGuard } from './pages/files-page/files-page.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { UsersPageComponent } from './pages/admin-page/users-page/users-page.component';
// import { InvitationsPageComponent } from './pages/admin-page/invitations-page/invitations-page.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';

import { FilesPageComponent } from './pages/files-page/files-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuard]},
  { path: 'register', component: RegisterPageComponent, canActivate: [LoginPageGuard]},
  { path: 'files', component: FilesPageComponent, canActivate: [FilesPageGuard], children: [
    {
      path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
      path: 'list', component: ListPageComponent
    },
    {
      path: 'downloads', component: DownloadsPageComponent
    },
    {
      path: 'uploads', component: UploadsPageComponent, canActivate: [UploadsPageGuard]
    }
  ]},
  { path: 'player', component: PlayerPageComponent, canActivate: [PlayerPageGuard] },
  { path: 'users', component: UsersPageComponent, canActivate: [], children: [
    {
      path: '', redirectTo: 'registered', pathMatch: 'full'
    },
    {
      path: 'registered', component: RegisteredPageComponent
    },
    {
      path: 'invitations', component: InvitationsPageComponent
    }
  ]},
  {
    path: 'userinfo', component: UpdateUserPageComponent, canActivate: [FilesPageGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
