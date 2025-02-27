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
  kanjis: Kanji[] = [];
  currentIndex!: number;

  constructor() {
    effect(() => (this.kanji().id !== -1 ? console.log(this.kanji()) : null));
    console.log(this.currentIndex);
  }

  ngOnInit() {
    // Vérifier si les kanjis sont déjà chargés
    this.kanjiService.getAll().subscribe((result) => {
      this.kanjis = result;

      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));
        this.currentIndex = this.kanjis.findIndex((k) => k.id === id);

        if (this.currentIndex !== -1) {
          this.kanji.set(this.kanjis[this.currentIndex]);
        } else {
          // Si l'ID n'existe pas dans la liste, on redirige vers la liste des kanjis
          this.router.navigate(['home']);
        }
      });
    });
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.router.navigate(['/kanji', this.kanjis[this.currentIndex - 1].id]);
    }
  }

  goToNext() {
    if (this.currentIndex < this.kanjis.length - 1) {
      this.router.navigate(['/kanji', this.kanjis[this.currentIndex + 1].id]);
    }
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  /* openKanji(kanjiId: number) {
    this.router.navigate(['kanji', kanjiId]);
  } */
}
