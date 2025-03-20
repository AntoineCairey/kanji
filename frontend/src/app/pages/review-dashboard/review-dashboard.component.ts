import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardService } from '../../services/card/card.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-review-dashboard',
  imports: [RouterLink],
  templateUrl: './review-dashboard.component.html',
  styleUrl: './review-dashboard.component.css',
})
export class ReviewDashboardComponent implements OnInit {
  private router = inject(Router);
  private loginService = inject(LoginService);
  cardService = inject(CardService);
  username = this.loginService.username;

  ngOnInit(): void {
    this.cardService.fetchCards();
  }

  navigate(url: any) {
    this.router.navigate(url);
  }
}
