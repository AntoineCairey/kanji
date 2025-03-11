import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-info',
  imports: [],
  templateUrl: './review-info.component.html',
  styleUrl: './review-info.component.css',
})
export class ReviewInfoComponent {
  private router = inject(Router);

  navigate(url: any) {
    this.router.navigate(url);
  }
}
