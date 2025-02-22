import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import kanjiData from '../../../../public/kanji-data.json';

@Component({
  selector: 'app-kanji',
  standalone: true,
  imports: [],
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css',
})
export class KanjiComponent implements OnInit {
  private route = inject(ActivatedRoute);
  kanji: any;
  data = Object.entries(kanjiData).map(([kanji, details]) => ({
    kanji,
    ...details,
  }));

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let kanjiId = params.get('id');
      this.kanji = this.data.find((kanji: any) => kanji.kanji === kanjiId);
      console.log('Nouvel ID détecté :', this.kanji);
    });
  }
}
