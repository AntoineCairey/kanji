import { Routes } from '@angular/router';
import { KanjiListComponent } from './pages/kanji-list/kanji-list.component';
import { KanjiComponent } from './pages/kanji/kanji.component';
import { LoginComponent } from './pages/login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReviewComponent } from './pages/review/review.component';
import { HomeComponent } from './pages/home/home.component';
import { ReviewDashboardComponent } from './pages/review-dashboard/review-dashboard.component';
import { ReviewInfoComponent } from './pages/review-info/review-info.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'list',
    component: KanjiListComponent,
  },
  {
    path: 'kanji/:symbol',
    component: KanjiComponent,
  },
  {
    path: 'review-info',
    component: ReviewInfoComponent,
  },
  {
    path: 'review-dashboard',
    component: ReviewDashboardComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [isLoggedInGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
