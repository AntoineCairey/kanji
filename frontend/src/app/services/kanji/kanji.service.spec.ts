import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { KanjiService } from './kanji.service';

describe('KanjiService', () => {
  let service: KanjiService;
  let httpTesting;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KanjiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(KanjiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
