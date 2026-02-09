import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { Offer, UserVote } from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  private voteSignal = signal<UserVote[]>([]);

  merchants = [
    {
      merchantName: 'Amazon',
      merchantId: 1,
    },
    {
      merchantName: 'Ebay',
      merchantId: 2,
    },
    {
      merchantName: 'Motorola',
      merchantId: 3,
    },
    {
      merchantName: 'Apple',
      merchantId: 4,
    },
    {
      merchantName: 'Samsung',
      merchantId: 5,
    },
  ];

  constructor() {
    this.loadVotesFromLocalStorage();
  }

  private offers$ = this.http.get<Offer[]>(this.apiUrl).pipe(
    map((offers) => {
      return offers.map((offer) => ({
        ...offer,
        merchantName: this.merchants[Math.floor(Math.random() * 5)].merchantName,
      }));
    }),
    shareReplay(1),
  );

  offers = toSignal(this.offers$, { initialValue: [] });

  offersSortedByVotes = toSignal(
    this.offers$.pipe(map((offers) => [...offers].sort((a, b) => b.rating.count - a.rating.count))),
    { initialValue: [] },
  );

  getVotesForUser(userId: number, offerId: number): UserVote | null {
    const vote = this.voteSignal().find(
      (vote) => vote.userId === userId && vote.offerId === offerId,
    );

    return vote ? vote : null;
  }

  vote(userId: number, offerId: number, voteType: 'up' | 'down'): string {
    const existingVote = this.getVotesForUser(userId, offerId);

    if (existingVote) {
      // Remove old vote first
      this.removeVote(userId, offerId);

      // Only add new vote if it's different
      if (existingVote.voteType !== voteType) {
        this.addVote(userId, offerId, voteType);
        return `${this.capitalize(voteType)}vote added`;
      }
      return `${this.capitalize(voteType)}vote removed`;
    }

    // No existing vote - add new one
    this.addVote(userId, offerId, voteType);
    return `${this.capitalize(voteType)}vote added`;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  addVote(userId: number, offerId: number, voteType: 'up' | 'down'): void {
    this.voteSignal.update((vote) => [...vote, { userId, offerId, voteType }]);
    this.saveVotesToLocalStorage();
  }

  removeVote(userId: number, offerId: number): void {
    this.voteSignal.update((vote) => {
      return vote.filter((vote) => vote.userId !== userId || vote.offerId !== offerId);
    });
    this.saveVotesToLocalStorage();
  }

  private loadVotesFromLocalStorage() {
    const votes = localStorage.getItem('userVotes');
    if (votes) {
      try {
        this.voteSignal.set(JSON.parse(votes));
      } catch (e) {
        console.error('Failed to load votes from localStorage', e);
        localStorage.removeItem('userVotes');
      }
    }
  }

  private saveVotesToLocalStorage() {
    localStorage.setItem('userVotes', JSON.stringify(this.voteSignal()));
  }
}
