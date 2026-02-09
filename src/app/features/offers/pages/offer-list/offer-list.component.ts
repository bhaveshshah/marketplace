import { Component, inject } from '@angular/core';
import { OfferService } from '@services/offer.service';
import { OfferCardComponent } from '@OfferComponents/offer-card/offer-card.component';

@Component({
  selector: 'app-offer-list',
  standalone: true,
  imports: [OfferCardComponent],
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.scss',
})
export class OfferListComponent {
  offerService = inject(OfferService);
}
