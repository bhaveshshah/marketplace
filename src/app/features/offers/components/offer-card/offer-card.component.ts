import { Component, input } from '@angular/core';
import { Offer } from '@core/models/offer.model';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss',
})
export class OfferCardComponent {
  offer = input.required<Offer>();
}
