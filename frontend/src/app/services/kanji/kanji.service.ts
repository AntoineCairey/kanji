import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Kanji } from '../../models/kanji.model';
import { Word } from '../../models/word.model';
import { toRomaji } from 'wanakana';

@Injectable({
  providedIn: 'root',
})
export class KanjiService {
  private BASE_URL = 'http://localhost:8080/api/kanji';
  private http = inject(HttpClient);
  kanjis = signal<Kanji[]>([]);
  words = signal<Word[]>([]);

  fetchKanjis() {
    this.http.get<Kanji[]>(this.BASE_URL).subscribe((data) => {
      this.kanjis.set(data);
    });
  }

  fetchWords(symbol: string) {
    this.http
      .get<Word[]>(`${this.BASE_URL}/${symbol}/words`)
      .subscribe((data) => this.words.set(data));
  }

  toRomaji(kana: string): string {
    return kana ? toRomaji(kana) : '';
  }
}
