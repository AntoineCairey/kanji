import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credentials, LoginService } from '../../services/login/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);
  private http = inject(HttpClient);

  private loginSubscription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  invalidCredentials = false;

  login() {
    this.loginSubscription = this.loginService
      .login(this.loginFormGroup.value as Credentials)
      .subscribe({
        next: (result) => this.navigate(['']),
        error: (error) => (this.invalidCredentials = true),
      });
  }

  navigate(route: any) {
    this.router.navigate(route);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
