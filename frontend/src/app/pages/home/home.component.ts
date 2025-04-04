import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private loginService = inject(LoginService);
  username = this.loginService.username;
  isDialogOpen = signal(false);

  navigate(route: any) {
    this.router.navigate(route);
  }

  logout() {
    this.loginService.logout();
  }
}
