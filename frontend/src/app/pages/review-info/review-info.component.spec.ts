import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInfoComponent } from './review-info.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ReviewInfoComponent', () => {
  let component: ReviewInfoComponent;
  let fixture: ComponentFixture<ReviewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewInfoComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
