import { Routes } from '@angular/router';
import { KanjiListComponent } from './pages/kanji-list/kanji-list.component';
import { KanjiComponent } from './pages/kanji/kanji.component';

export const routes: Routes = [
  { path: '', component: KanjiListComponent },
  { path: 'kanji/:id', component: KanjiComponent },
];
