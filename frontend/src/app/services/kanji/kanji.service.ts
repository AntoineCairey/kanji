import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { Kanji } from '../../models/kanji.model';

@Injectable({
  providedIn: 'root',
})
export class KanjiService {
  private BASE_URL = 'http://localhost:8080/api/kanji';
  private http = inject(HttpClient);
  kanjis = signal<Kanji[]>([]);

  fetch() {
    this.http.get<Kanji[]>(this.BASE_URL).subscribe((data) => {
      this.kanjis.set(data);
    });
  }

  get(id: number): Observable<Kanji> {
    return this.http.get<Kanji>(this.BASE_URL + '/' + id);
  }
}
