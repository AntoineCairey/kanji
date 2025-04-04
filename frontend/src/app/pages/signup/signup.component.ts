import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Credentials, LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
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

  isFieldValid(name: string) {
    const formControl = this.signupForm.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }
}
