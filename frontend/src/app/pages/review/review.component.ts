import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardService } from '../../services/card.service';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../models/card.model';
import { KanjiService } from '../../services/kanji.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-review',
  imports: [RouterLink],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cardService = inject(CardService);
  private kanjiService = inject(KanjiService);

  cards = this.cardService.cardsToReview;
  currentIndex = signal<number>(0);
  card = computed<Card>(() => this.cards()[this.currentIndex()]);
  isAnswer = signal<boolean>(false);

  ngOnInit(): void {
    this.cardService.fetchCards();
  }

  showAnswer() {
    this.isAnswer.set(true);
  }

  reviewCard(cardId: number, isSuccess: boolean) {
    this.http
      .put(
        `${environment.apiUrl}/cards/review/${cardId}?success=${isSuccess}`,
        {},
      )
      .subscribe((_) => {
        this.isAnswer.set(false);
        if (this.currentIndex() < this.cards().length - 1) {
          this.currentIndex.update((ci) => ci + 1);
        } else {
          this.router.navigate(['review-dashboard']);
        }
      });
  }

  power(a: number, b: number) {
    return Math.pow(a, b);
  }

  toRomaji = this.kanjiService.toRomaji;

  navigate(url: any) {
    this.router.navigate(url);
  }
}
