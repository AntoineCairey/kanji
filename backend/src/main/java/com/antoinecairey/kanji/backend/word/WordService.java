package com.antoinecairey.kanji.backend.word;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WordService {
  private final WordRepository wordRepository;

  public List<Word> getWordsContainingKanji(String kanji) {
    return wordRepository.findByKanjiContaining(kanji);
  }
}
