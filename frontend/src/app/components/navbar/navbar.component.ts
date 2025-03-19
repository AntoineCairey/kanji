import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private router = inject(Router);
  isModalOpen = signal(false);

  navigate(route: any) {
    this.router.navigate(route);
  }
}
