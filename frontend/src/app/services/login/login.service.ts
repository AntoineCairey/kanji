import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080';

  username = signal(undefined);

  login(credentials: Credentials) {
    return this.http.post(this.BASE_URL + '/auth/login', credentials).pipe(
      tap((result: any) => {
        localStorage.setItem('token', result['token']);
        this.username.set(result['username']);
      }),
      map((result: any) => {
        return this.username();
      }),
    );
  }

  register(credentials: Credentials) {
    return this.http
      .post(this.BASE_URL + '/auth/register', credentials, {
        responseType: 'text',
      })
      .pipe(switchMap((_) => this.login(credentials)));
  }
}
