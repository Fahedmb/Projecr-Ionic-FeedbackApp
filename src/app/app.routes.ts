import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'presentation',
    loadComponent: () => import('./pages/presentation/presentation.page').then( m => m.PresentationPage)
  },
  {
    path: 'results',
    loadComponent: () => import('./pages/results/results.page').then( m => m.ResultsPage)
  },
];
