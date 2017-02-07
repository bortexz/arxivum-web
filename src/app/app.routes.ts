import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FilesPageGuard } from './pages/files-page/files-page.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';

import { FilesPageComponent } from './pages/files-page/files-page.component';
import { UsersAdminPageComponent } from './pages/users-admin-page/users-admin-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuard]},
  { path: 'register', component: RegisterPageComponent, canActivate: [LoginPageGuard]},
  { path: 'folder', component: FilesPageComponent, canActivate: [FilesPageGuard]},
  { path: 'admin/users', component: UsersAdminPageComponent, canActivate: []},
  {
    path: '**',
    redirectTo: 'folder',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
