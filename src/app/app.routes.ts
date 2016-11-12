import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageGuard } from './pages/home-page/home-page.guard';

import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [HomePageGuard]},
  { path: 'admin', component: AdminPageComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
