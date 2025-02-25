import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credentials, LoginService } from '../../services/login/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
        next: (result) => this.navigateHome(),
        error: (error) => {
          this.invalidCredentials = true;
          console.log('error');
        },
      });
  }

  /* login() {
    this.http
      .post('http://localhost:8080/auth/login', this.loginFormGroup.value, {
        responseType: 'text',
      })
      .subscribe((result) => console.log(result));
  } */

  navigateHome() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
