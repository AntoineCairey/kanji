import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Card } from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private BASE_URL = 'http://localhost:8080/api/cards';
  private http = inject(HttpClient);
  cards = signal<Card[]>([]);

  fetchCards() {
    this.http.get<Card[]>(this.BASE_URL + '/review').subscribe((toReview) => {
      this.cards.set(toReview);
      this.http
        .get<Card[]>(this.BASE_URL + '/discover')
        .subscribe((toDiscover) => {
          this.cards.update((c) => c.concat(toDiscover));
        });
    });
  }
}
