import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card/card.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '../../models/card.model';
import { KanjiService } from '../../services/kanji/kanji.service';

@Component({
  selector: 'app-review',
  imports: [MatButtonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  private BASE_URL = 'http://localhost:8080/api/cards';
  private http = inject(HttpClient);
  private router = inject(Router);
  private cardService = inject(CardService);
  private kanjiService = inject(KanjiService);

  cards = this.cardService.cards;
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
      .put(`${this.BASE_URL}/review/${cardId}?success=${isSuccess}`, {})
      .subscribe((_) => {
        this.isAnswer.set(false);
        if (this.currentIndex() < this.cards().length - 1) {
          this.currentIndex.update((ci) => ci + 1);
        } else {
          this.router.navigate(['home']);
        }
      });
  }

  power(a: number, b: number) {
    return Math.pow(a, b);
  }

  toRomaji = this.kanjiService.toRomaji;
}
