import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'app-review-dashboard',
  imports: [],
  templateUrl: './review-dashboard.component.html',
  styleUrl: './review-dashboard.component.css',
})
export class ReviewDashboardComponent implements OnInit {
  private router = inject(Router);
  cardService = inject(CardService);

  ngOnInit(): void {
    this.cardService.fetchCards();
  }

  navigate(url: any) {
    this.router.navigate(url);
  }
}
