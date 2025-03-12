import { Kanji } from './kanji.model';
import { User } from './user.model';

export class Card {
  id: number = -1;
  user: User = new User();
  kanji: Kanji = new Kanji();
  isReverse: boolean = false;
  streak: number = 0;
  lastReview: string | null = null;
  nextReview: string | null = null;
}
