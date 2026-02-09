import { Component, computed, inject, input } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { OfferService } from '@services/offer.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-vote-buttons',
  standalone: true,
  templateUrl: './vote-buttons.component.html',
  styleUrl: './vote-buttons.component.scss',
})
export class VoteButtonsComponent {
  offerId = input.required<number>();

  authService = inject(AuthService);
  offerService = inject(OfferService);
  toastService = inject(ToastService);

  currentUserVote = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return null;
    return this.offerService.getVotesForUser(user.id, this.offerId())?.voteType ?? null;
  });

  handleVote(voteValue: 'up' | 'down'): void {
    const user = this.authService.currentUser();
    if (!user) {
      this.toastService.show('Please login to vote', 'info');
      return;
    }

    const toastMessage = this.offerService.vote(user.id, this.offerId(), voteValue);
    const toastType = toastMessage.includes('added') ? 'success' : 'info';

    this.toastService.show(toastMessage, toastType);
  }
}
