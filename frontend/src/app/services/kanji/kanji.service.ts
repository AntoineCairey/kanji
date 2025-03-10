import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Kanji } from '../../models/kanji.model';
import { Word } from '../../models/word.model';
import { toRomaji } from 'wanakana';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KanjiService {
  private http = inject(HttpClient);
  kanjis = signal<Kanji[]>([]);
  words = signal<Word[]>([]);

  fetchKanjis() {
    this.http.get<Kanji[]>(environment.apiUrl + '/kanji').subscribe((data) => {
      this.kanjis.set(data);
    });
  }

  fetchWords(symbol: string) {
    this.http
      .get<Word[]>(`${environment.apiUrl}/kanji/${symbol}/words`)
      .subscribe((data) => this.words.set(data));
  }

  toRomaji(kana: string): string {
    return kana ? toRomaji(kana) : '';
  }
}
