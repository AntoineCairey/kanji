import { Component, inject } from '@angular/core';
import kanjiData from '../../../../public/kanji-data.json';
import { TileComponent } from '../../components/tile/tile.component';
import { Router } from '@angular/router';
import { KanjiService } from '../../services/kanji.service';
import { toSignal } from '@angular/core/rxjs-interop';

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

  kanjis = toSignal(this.kanjiService.getAll());

  constructor() {
    /* console.log(this.data); */
    console.log(this.kanjis());
  }

  openKanji(kanji: any) {
    this.router.navigate(['kanji', kanji.id]);
  }
}
