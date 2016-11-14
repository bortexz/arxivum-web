import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageGuard } from './pages/home-page/home-page.guard';

import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminPageGuard } from './pages/admin-page/admin-page.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [HomePageGuard]},
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminPageGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
