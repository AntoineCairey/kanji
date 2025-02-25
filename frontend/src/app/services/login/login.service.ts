import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

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

  login(credentials: Credentials) {
    console.log('coucou');
    return this.http
      .post(this.BASE_URL + '/auth/login', credentials, {
        responseType: 'text',
      })
      .pipe(
        tap((result: any) => {
          console.log('hola');
          console.log(result);
          localStorage.setItem('token', result);
        }),
      );
  }
}
