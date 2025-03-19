import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavbarComponent],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private location = inject(Location);

  showBackButton: boolean = false;

  ngOnInit() {
    // Écouter les changements d'URL pour détecter si le composant enfant est actif
    this.router.events.subscribe(() => {
      if (this.router.url.includes('/home')) {
        this.showBackButton = false;
      } else {
        this.showBackButton = true;
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
