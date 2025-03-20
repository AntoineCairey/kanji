import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private loginService = inject(LoginService);
  username = this.loginService.username;
  logout = this.loginService.logout;
}
