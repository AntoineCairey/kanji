import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private router = inject(Router);
  private loginService = inject(LoginService);
  private cardService = inject(CardService);
  username = this.loginService.username;
  stats = this.cardService.stats;

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.cardService.fetchStats();
  }
}
