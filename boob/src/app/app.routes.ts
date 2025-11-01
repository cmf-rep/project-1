import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'testingcon',
    loadComponent: () => import('./testingcon/testingcon.page').then( m => m.TestingconPage)
  },
  {
    path: 'e-connect',
    loadComponent: () => import('./e-connect/e-connect.page').then( m => m.EConnectPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'notif',
    loadComponent: () => import('./notif/notif.page').then( m => m.NotifPage)
  },
  {
    path: 'eclass',
    loadComponent: () => import('./eclass/eclass.page').then( m => m.EclassPage)
  },
];
