import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';

import { FilesPageComponent } from './pages/files-page/files-page.component';

import { RootFolderResolver } from './services/folders/root.resolver';
import { FolderResolver } from './services/folders/folder.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuard]},
  { path: 'folder', component: FilesPageComponent, resolve: {folder: RootFolderResolver}},
  { path: 'folder/:id', component: FilesPageComponent, resolve: {folder: FolderResolver}}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
