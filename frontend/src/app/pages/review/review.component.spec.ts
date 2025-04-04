import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CardService } from '../../services/card.service';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let cardService: CardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;

    cardService = TestBed.inject(CardService);
    cardService.cards.set([
      {
        id: 3,
        user: {
          id: 1,
          username: 'alice',
          password: '$2a$10',
          role: 'USER',
        },
        kanji: {
          id: 2,
          symbol: '七',
          fr: 'sept',
          kun: 'なな, なの',
          onn: 'シチ',
        },
        isReverse: false,
        streak: 4,
        lastReview: '2025-03-21',
        nextReview: '2025-04-06',
      },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
