import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KanjiService } from '../../services/kanji.service';
import { of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
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
  kanji: Kanji | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const kanjiId = +this.route.snapshot.paramMap.get('id')!;
      this.kanjiService.get(kanjiId).subscribe((kanji) => (this.kanji = kanji));
      console.log('Nouvel ID détecté :', kanjiId);
    });
  }
}
