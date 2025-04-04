import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { KanjiComponent } from './kanji.component';
import { KanjiService } from '../../services/kanji.service';
import { Kanji } from '../../models/kanji.model';

describe('KanjiComponent', () => {
  let component: KanjiComponent;
  let fixture: ComponentFixture<KanjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanjiComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(KanjiComponent);
    component = fixture.componentInstance;

    component.currentKanji = signal<Kanji>({
      id: 1,
      symbol: '一',
      fr: 'un',
      kun: 'ひと',
      onn: 'イチ, イツ',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
