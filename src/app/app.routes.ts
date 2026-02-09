import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'offers',
    pathMatch: 'full',
  },
  {
    path: 'offers',
    loadChildren: () =>
      import('./features/offers/pages/offers.routes').then((m) => m.OFFERS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'offers',
  },
];
