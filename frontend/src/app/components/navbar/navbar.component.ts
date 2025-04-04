import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private router = inject(Router);
  private loginService = inject(LoginService);
  isModalOpen = signal(false);
  username = this.loginService.username;

  navigate(route: any) {
    this.router.navigate(route);
  }
}
