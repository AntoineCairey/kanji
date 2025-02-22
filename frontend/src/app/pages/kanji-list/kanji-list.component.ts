import { Component, inject } from '@angular/core';
import kanjiData from '../../../../public/kanji-data.json';
import { TileComponent } from '../../components/tile/tile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanji-list',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './kanji-list.component.html',
  styleUrl: './kanji-list.component.css',
})
export class KanjiListComponent {
  private router = inject(Router);
  data = Object.entries(kanjiData).map(([kanji, details]) => ({
    kanji,
    ...details,
  }));

  constructor() {
    console.log(this.data);
  }

  openKanji(kanji: any) {
    this.router.navigate(['kanji', kanji.kanji]);
  }
}
