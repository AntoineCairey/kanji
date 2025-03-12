import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../models/card.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private http = inject(HttpClient);
  cards = signal<Card[]>([]);
  private today = new Date().toISOString().split('T')[0];

  cardsReviewed = computed(() =>
    this.cards().filter((c) => c.lastReview === this.today),
  );
  cardsToReview = computed(() =>
    this.cards().filter((c) => c.lastReview !== this.today),
  );

  cardsOld = computed(() =>
    this.cards().filter((c) => c.lastReview && c.lastReview !== this.today),
  );
  cardsNew = computed(() => this.cards().filter((c) => !c.lastReview));

  fetchCards() {
    this.http
      .get<Card[]>(environment.apiUrl + '/cards/review')
      .subscribe((c) => this.cards.set(c));
  }
}
