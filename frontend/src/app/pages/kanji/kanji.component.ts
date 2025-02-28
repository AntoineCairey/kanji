import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KanjiService } from '../../services/kanji/kanji.service';
import { MatButtonModule } from '@angular/material/button';
import { TileComponent } from '../../components/tile/tile.component';

@Component({
  selector: 'app-kanji',
  imports: [MatButtonModule, TileComponent],
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css',
})
export class KanjiComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private kanjiService = inject(KanjiService);

  kanjis = this.kanjiService.kanjis;
  currentId = signal(0);
  currentIndex = computed(() => {
    return this.kanjis().findIndex((k) => k.id === this.currentId());
  });
  currentKanji = computed(() => this.kanjis()[this.currentIndex()]);
  words = this.kanjiService.words;

  constructor() {
    effect(() => {
      if (this.currentKanji()) {
        this.kanjiService.fetchWords(this.currentKanji().symbol);
      }
    });
  }

  ngOnInit(): void {
    if (this.kanjis().length === 0) {
      this.kanjiService.fetchKanjis();
    }
    this.route.paramMap.subscribe((params) => {
      let id = Number(params.get('id'));
      this.currentId.set(id);
      console.log(this.currentKanji());
    });
  }

  goToPrevious() {
    if (this.currentIndex() > 0) {
      this.router.navigate([
        '/kanji',
        this.kanjis()[this.currentIndex() - 1].id,
      ]);
    }
  }

  goToNext() {
    if (this.currentIndex() < this.kanjis().length - 1) {
      this.router.navigate([
        '/kanji',
        this.kanjis()[this.currentIndex() + 1].id,
      ]);
    }
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  toRomaji = this.kanjiService.toRomaji;
}
