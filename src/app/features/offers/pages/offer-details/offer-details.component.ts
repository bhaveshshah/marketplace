import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { OfferService } from '@services/offer.service';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';
import { VoteButtonsComponent } from '@OfferComponents/vote-buttons/vote-buttons.component';

@Component({
  selector: 'app-offer-details',
  standalone: true,
  imports: [CommonModule, VoteButtonsComponent, RouterLink, CurrencyPipe],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.scss',
})
export class OfferDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  offerService = inject(OfferService);
  authService = inject(AuthService);
  toastService = inject(ToastService);

  private routeId = toSignal(this.route.params.pipe(map((params) => params['id'])));

  offer = computed(() => {
    const id = Number(this.routeId());
    if (!id) return null;
    const offers = this.offerService.offers();
    return offers.find((offer) => offer.id === id) || null;
  });

  isLoading = computed(() => this.offerService.offers().length === 0);

  constructor() {
    effect(() => {
      const offer = this.offer();
      const loading = this.isLoading();

      if (!loading && !offer) {
        this.toastService.show('Offer not found', 'error');
        this.router.navigate(['/offers']);
      }
    });
  }

  purchase() {
    if (!this.authService.isLoggedIn()) {
      this.toastService.show('Please log in to make a purchase', 'error');
      this.router.navigate(['/login']);
      return;
    }

    this.toastService.show('Purchase successful!', 'success');
  }
}
