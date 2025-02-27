import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KanjiService } from '../../services/kanji/kanji.service';
import { Kanji } from '../../models/kanji.model';
import { switchMap } from 'rxjs';
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

  kanji = signal<Kanji>(new Kanji());

  constructor() {
    effect(() => (this.kanji().id !== -1 ? console.log(this.kanji()) : null));
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = +params.get('id')!;
          return this.kanjiService.get(id);
        }),
      )
      .subscribe((result) => this.kanji.set(result));
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  openKanji(kanjiId: number) {
    this.router.navigate(['kanji', kanjiId]);
  }
}
