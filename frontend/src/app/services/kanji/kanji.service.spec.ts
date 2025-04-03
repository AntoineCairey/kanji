import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { KanjiService } from './kanji.service';
import { Kanji } from '../../models/kanji.model';
import { environment } from '../../../environments/environment';
import { Word } from '../../models/word.model';

describe('KanjiService', () => {
  let service: KanjiService;
  let httpTesting: HttpTestingController;

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

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch kanjis and update signal', () => {
    const mockKanjis: Kanji[] = [
      { id: 1, symbol: '一', fr: 'un', kun: 'ひと', onn: 'イチ, イツ' },
    ];
    service.fetchKanjis();
    const req = httpTesting.expectOne(`${environment.apiUrl}/kanji`);
    expect(req.request.method).toBe('GET');
    req.flush(mockKanjis); // Simule la réponse HTTP
    expect(service.kanjis()).toEqual(mockKanjis); // Vérifie que le signal a été mis à jour
  });

  it('should handle HTTP errors and set kanjis to empty array', () => {
    service.fetchKanjis();
    const req = httpTesting.expectOne(`${environment.apiUrl}/kanji`);
    req.error(new ProgressEvent('Network error'));
    expect(service.kanjis()).toEqual([]); // Vérifie que l'erreur ne casse pas l'application
  });

  it('should fetch words for a kanji and update signal', () => {
    const mockWords: Word[] = [{ id: 62, kanji: '一', kana: 'いち', fr: 'un' }];
    service.fetchWords('一');
    const req = httpTesting.expectOne(`${environment.apiUrl}/kanji/一/words`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWords);
    expect(service.words()).toEqual(mockWords);
  });

  it('should handle HTTP errors and set words to empty array', () => {
    service.fetchWords('一');
    const req = httpTesting.expectOne(`${environment.apiUrl}/kanji/一/words`);
    req.error(new ProgressEvent('Server Error'));
    expect(service.words()).toEqual([]); // Vérifie que l'erreur est bien gérée
  });
});
