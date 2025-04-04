import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credentials, LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);

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
        next: (result) => this.navigate(['review-dashboard']),
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
