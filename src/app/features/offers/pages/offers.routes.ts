import { Routes } from '@angular/router';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';

export const OFFERS_ROUTES: Routes = [
  {
    path: '',
    component: OfferListComponent,
  },
  {
    path: ':id',
    component: OfferDetailsComponent,
  },
];
