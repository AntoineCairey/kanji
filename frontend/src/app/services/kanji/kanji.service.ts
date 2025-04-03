import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Kanji } from '../../models/kanji.model';
import { Word } from '../../models/word.model';
import { toRomaji } from 'wanakana';
import { environment } from '../../../environments/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KanjiService {
  private http = inject(HttpClient);
  kanjis = signal<Kanji[]>([]);
  words = signal<Word[]>([]);

  fetchKanjis() {
    this.http
      .get<Kanji[]>(environment.apiUrl + '/kanji')
      .pipe(
        catchError((err) => {
          console.error('Failed to fetch kanjis:', err);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.kanjis.set(data);
      });
  }

  fetchWords(symbol: string) {
    this.http
      .get<Word[]>(`${environment.apiUrl}/kanji/${symbol}/words`)
      .pipe(
        catchError((err) => {
          console.error(`Failed to fetch words for ${symbol}:`, err);
          return of([]);
        }),
      )
      .subscribe((data) => this.words.set(data));
  }

  toRomaji(kana: string): string {
    return kana ? toRomaji(kana) : '';
  }
}
