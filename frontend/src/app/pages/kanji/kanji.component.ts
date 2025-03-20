import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KanjiService } from '../../services/kanji/kanji.service';

@Component({
  selector: 'app-kanji',
  imports: [RouterLink],
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css',
})
export class KanjiComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private kanjiService = inject(KanjiService);

  kanjis = this.kanjiService.kanjis;
  currentSymbol = signal('');
  currentIndex = computed(() => {
    return this.kanjis().findIndex((k) => k.symbol === this.currentSymbol());
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
      let symbol = params.get('symbol');
      this.currentSymbol.set(symbol!);
      console.log(this.currentKanji());
    });
  }

  goToPrevious() {
    if (this.currentIndex() > 0) {
      this.router.navigate([
        '/kanji',
        this.kanjis()[this.currentIndex() - 1].symbol,
      ]);
    }
  }

  goToNext() {
    if (this.currentIndex() < this.kanjis().length - 1) {
      this.router.navigate([
        '/kanji',
        this.kanjis()[this.currentIndex() + 1].symbol,
      ]);
    }
  }

  toRomaji = this.kanjiService.toRomaji;
}
