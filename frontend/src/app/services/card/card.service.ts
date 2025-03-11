import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Card } from '../../models/card.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private http = inject(HttpClient);
  cards = signal<Card[]>([]);

  fetchCards() {
    this.http
      .get<Card[]>(environment.apiUrl + '/cards/review')
      .subscribe((toReview) => {
        this.cards.set(toReview);
        this.http
          .get<Card[]>(environment.apiUrl + '/cards/discover')
          .subscribe((toDiscover) => {
            this.cards.update((c) => c.concat(toDiscover));
          });
      });
  }

  
}
