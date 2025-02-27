import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { Kanji } from '../../models/kanji.model';

@Injectable({
  providedIn: 'root',
})
export class KanjiService {
  private BASE_URL = 'http://localhost:8080/api/kanji';
  private http = inject(HttpClient);
  private kanjis: Kanji[] = [];

  fetch(): Observable<Kanji[]> {
    console.log('fetch');
    return this.http.get<Kanji[]>(this.BASE_URL).pipe(
      tap((data) => {
        this.kanjis = data;
        console.log("data");
      }),
    );
  }

  getAll() {
    if (this.kanjis.length > 0) {
      // Si les kanjis sont déjà chargés, on les renvoie immédiatement
      return of(this.kanjis);
    } else {
      // Sinon, on attend la réponse API avant de retourner les données
      return this.fetch() // Met à jour la liste une fois chargée
    }
  }

  get(id: number): Observable<Kanji> {
    return this.http.get<Kanji>(this.BASE_URL + '/' + id);
  }
}
