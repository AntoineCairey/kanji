import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);

  username = signal(null);

  login(credentials: Credentials) {
    return this.http.post(environment.apiUrl + '/auth/login', credentials).pipe(
      tap((result: any) => {
        localStorage.setItem('token', result['token']);
        this.username.set(result['username']);
      }),
      map((result: any) => {
        return this.username();
      }),
    );
  }

  getUser() {
    return this.http.get(environment.apiUrl + '/users/me').pipe(
      tap((result: any) => this.username.set(result['username'])),
      map((_) => this.username()),
    );
  }

  register(credentials: Credentials) {
    return this.http
      .post(environment.apiUrl + '/auth/register', credentials, {
        responseType: 'text',
      })
      .pipe(switchMap((_) => this.login(credentials)));
  }

  logout() {
    localStorage.removeItem('token');
    this.username.set(null);
    this.router.navigate(['/home']);
  }
}
