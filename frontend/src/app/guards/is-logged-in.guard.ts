import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { catchError, map } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.username()) {
    return loginService.getUser().pipe(
      map((_) => true),
      catchError((_) => router.navigate(['review-info']))
    );
  }

  return true;
};
