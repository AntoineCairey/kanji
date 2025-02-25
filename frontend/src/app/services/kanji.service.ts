import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kanji } from '../models/kanji.model';

@Injectable({
  providedIn: 'root',
})
export class KanjiService {
  private BASE_URL = 'http://localhost:8080/api/kanji';
  private http = inject(HttpClient);

  getAll(): Observable<Kanji[]> {
    return this.http.get<Kanji[]>(this.BASE_URL);
  }

  get(id: number): Observable<Kanji> {
    return this.http.get<Kanji>(this.BASE_URL + '/' + id);
  }
}
