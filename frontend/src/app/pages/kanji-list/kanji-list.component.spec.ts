import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { KanjiListComponent } from './kanji-list.component';
import { KanjiService } from '../../services/kanji.service';
import { TileComponent } from '../../components/tile/tile.component';
import { Kanji } from '../../models/kanji.model';

describe('KanjiListComponent', () => {
  let component: KanjiListComponent;
  let fixture: ComponentFixture<KanjiListComponent>;
  let kanjiService: KanjiService;
  let fetchKanjisSpy: jasmine.Spy<() => void>;
  let router: Router;
  let navigateSpy;

  const mockKanjis: Kanji[] = [
    { id: 1, symbol: '一', fr: 'un', kun: 'ひと', onn: 'イチ, イツ' },
    { id: 2, symbol: '七', fr: 'sept', kun: 'なな, なの', onn: 'シチ' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KanjiListComponent, TileComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(KanjiListComponent);
    component = fixture.componentInstance;

    kanjiService = TestBed.inject(KanjiService);
    fetchKanjisSpy = spyOn(kanjiService, 'fetchKanjis').and.callFake(() => {
      kanjiService.kanjis.set(mockKanjis);
    });

    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchKanjis() if the kanji list is empty', () => {
    expect(fetchKanjisSpy).toHaveBeenCalled();
  });

  it('should not call fetchKanjis() if kanjis are already loaded', () => {
    kanjiService.kanjis.set([
      { id: 1, symbol: '一', fr: 'un', kun: 'ひと', onn: 'イチ, イツ' },
      { id: 2, symbol: '七', fr: 'sept', kun: 'なな, なの', onn: 'シチ' },
    ]);
    fetchKanjisSpy.calls.reset();
    fixture = TestBed.createComponent(KanjiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(kanjiService.fetchKanjis).not.toHaveBeenCalled();
  });

  it('should navigate to the correct kanji page on click', () => {
    component.openKanji('一');
    expect(router.navigate).toHaveBeenCalledWith(['kanji', '一']);
  });

  it('should display the correct number of kanji tiles', () => {
    const tiles = fixture.nativeElement.querySelectorAll('app-tile');
    expect(tiles.length).toBe(mockKanjis.length);
  });
});
