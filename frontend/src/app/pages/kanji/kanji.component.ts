import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KanjiService } from '../../services/kanji.service';
import { Kanji } from '../../models/kanji.model';

@Component({
  selector: 'app-kanji',
  standalone: true,
  imports: [],
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css',
})
export class KanjiComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private kanjiService = inject(KanjiService);

  kanji = signal<Kanji>(new Kanji());

  ngOnInit() {
    const kanjiId = +this.route.snapshot.paramMap.get('id')!;
    this.kanjiService.get(kanjiId).subscribe((kanji) => this.kanji.set(kanji));
    console.log('Nouvel ID détecté :', kanjiId);
  }
}
