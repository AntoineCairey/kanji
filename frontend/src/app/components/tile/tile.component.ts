import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { KanjiService } from '../../services/kanji/kanji.service';

@Component({
  selector: 'app-tile',
  imports: [MatCardModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
})
export class TileComponent {
  private kanjiService = inject(KanjiService);

  kanji: any = input();

  toRomaji = this.kanjiService.toRomaji;
}
