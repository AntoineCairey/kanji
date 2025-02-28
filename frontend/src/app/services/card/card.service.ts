import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private BASE_URL = 'http://localhost:8080/api/cards';
  private http = inject(HttpClient);
  card = signal([]);

  fetchCards() {
      this.http.get(this.BASE_URL + "/user/").subscribe((data) => {
        this.kanjis.set(data);
      });
    }
}
