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
  },  {
    path: 'sleepiness',
    loadComponent: () => import('./sleepiness/sleepiness.page').then( m => m.SleepinessPage)
  },

];
