import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'overnight',
    pathMatch: 'full',
  },
  {
    path: 'overnight',
    loadComponent: () =>
      import('./overnight/overnight.page').then((m) => m.OvernightPage),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'sleepiness',
    loadComponent: () =>
      import('./sleepiness/sleepiness.page').then((m) => m.SleepinessPage),
  },
];