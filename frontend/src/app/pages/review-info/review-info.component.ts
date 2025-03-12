import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'app-review-info',
  imports: [],
  templateUrl: './review-info.component.html',
  styleUrl: './review-info.component.css',
})
export class ReviewInfoComponent implements OnInit {
  private router = inject(Router);
  cardService = inject(CardService);

  ngOnInit(): void {
    this.cardService.fetchCards();
  }

  navigate(url: any) {
    this.router.navigate(url);
  }
}
