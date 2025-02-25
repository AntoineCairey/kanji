import { Component, effect, inject } from '@angular/core';
import kanjiData from '../../../../public/kanji-data.json';
import { TileComponent } from '../../components/tile/tile.component';
import { Router } from '@angular/router';
import { KanjiService } from '../../services/kanji.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Kanji } from '../../models/kanji.model';

@Component({
  selector: 'app-kanji-list',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './kanji-list.component.html',
  styleUrl: './kanji-list.component.css',
})
export class KanjiListComponent {
  private router = inject(Router);
  private kanjiService = inject(KanjiService);

  kanjis = toSignal<Kanji[]>(this.kanjiService.getAll());

  constructor() {
    effect(() => (this.kanjis() ? console.log(this.kanjis()) : null));
  }

  openKanji(kanji: any) {
    this.router.navigate(['kanji', kanji.id]);
  }
}
