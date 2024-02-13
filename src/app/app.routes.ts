import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'slots',
    loadComponent: () =>
      import('./components/main-page/main-page.component').then((m) => m.MainPageComponent)
  },
  {
    path: '',
    redirectTo: 'slots',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
