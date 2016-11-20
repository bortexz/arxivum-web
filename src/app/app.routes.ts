import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageGuard } from './pages/home-page/home-page.guard';

import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminPageGuard } from './pages/admin-page/admin-page.guard';

import { AdminDashboardPageComponent } from './pages/admin-page/admin-dashboard-page/admin-dashboard-page.component';
import { AdminUsersPageComponent } from './pages/admin-page/admin-users-page/admin-users-page.component';
import { AdminFilesPageComponent } from './pages/admin-page/admin-files-page/admin-files-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [HomePageGuard]},
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminPageGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      { path: 'dashboard', component: AdminDashboardPageComponent },
      { path: 'users', component: AdminUsersPageComponent },
      { path: 'files', component: AdminFilesPageComponent}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
