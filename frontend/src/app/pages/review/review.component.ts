import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card/card.service';
import { HttpClient } from '@angular/common/http';
import { TileComponent } from '../../components/tile/tile.component';

@Component({
  selector: 'app-review',
  imports: [TileComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  private BASE_URL = 'http://localhost:8080/api/cards';
  private http = inject(HttpClient);
  private router = inject(Router);
  private cardService = inject(CardService);

  cards = this.cardService.cards;
  currentIndex = signal(0);
  card = computed(() => this.cards()[this.currentIndex()]);

  ngOnInit(): void {
    this.cardService.fetchCards();
  }

  reviewCard(cardId: number, isSuccess: boolean) {
    this.http
      .put(`${this.BASE_URL}/review/${cardId}?success=${isSuccess}`, {})
      .subscribe((_) => {
        if (this.currentIndex() < this.cards().length - 1) {
          this.currentIndex.update((ci) => ci + 1);
        } else {
          this.router.navigate(['home']);
        }
      });
  }
}
