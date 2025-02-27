import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TileComponent } from '../../components/tile/tile.component';
import { Router } from '@angular/router';
import { KanjiService } from '../../services/kanji/kanji.service';
import { Kanji } from '../../models/kanji.model';

@Component({
  selector: 'app-kanji-list',
  imports: [TileComponent],
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
    this.kanjiService.fetch();
  }

  openKanji(kanjiId: number) {
    this.router.navigate(['kanji', kanjiId]);
  }
}
