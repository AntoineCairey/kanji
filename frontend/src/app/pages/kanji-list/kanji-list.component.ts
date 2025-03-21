import { Component, effect, inject, OnInit } from '@angular/core';
import { TileComponent } from '../../components/tile/tile.component';
import { Router, RouterLink } from '@angular/router';
import { KanjiService } from '../../services/kanji/kanji.service';

@Component({
  selector: 'app-kanji-list',
  imports: [TileComponent, RouterLink],
  templateUrl: './kanji-list.component.html',
  styleUrl: './kanji-list.component.css',
})
export class KanjiListComponent implements OnInit {
  private router = inject(Router);
  private kanjiService = inject(KanjiService);

  kanjis = this.kanjiService.kanjis;

  constructor() {
    effect(() => (this.kanjis().length ? console.log(this.kanjis()) : null));
  }

  ngOnInit() {
    if (!this.kanjis().length) {
      this.kanjiService.fetchKanjis();
    }
  }

  openKanji(symbol: string) {
    this.router.navigate(['kanji', symbol]);
  }
}
