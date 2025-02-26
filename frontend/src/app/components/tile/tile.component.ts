import { Component, input } from '@angular/core';

@Component({
    selector: 'app-tile',
    imports: [],
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.css'
})
export class TileComponent {
  kanji: any = input();
}
