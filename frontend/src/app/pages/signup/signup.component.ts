import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials, LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);

  submitted = false;

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  signup() {
    this.loginService
      .register(this.signupForm.value as Credentials)
      .subscribe((result) => this.router.navigate(['']));
  }

  navigate(route: any) {
    this.router.navigate(route);
  }
}
