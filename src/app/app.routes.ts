import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FilesPageGuard } from './pages/files-page/files-page.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPageComponent } from './pages/admin-page/users-page/users-page.component';
import { InvitationsPageComponent } from './pages/admin-page/invitations-page/invitations-page.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';

import { FilesPageComponent } from './pages/files-page/files-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuard]},
  { path: 'register', component: RegisterPageComponent, canActivate: [LoginPageGuard]},
  { path: 'folder', component: FilesPageComponent, canActivate: [FilesPageGuard]},
  { path: 'admin', component: AdminPageComponent, canActivate: [], children: [
    {
      path: '', redirectTo: 'users', pathMatch: 'full'
    },
    {
      path: 'users', component: UsersPageComponent
    }, {
      path: 'invitations', component: InvitationsPageComponent
    }]
  },
  {
    path: '**',
    redirectTo: 'folder',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
