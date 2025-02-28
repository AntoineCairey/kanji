package com.antoinecairey.kanji.backend.kanji;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.antoinecairey.kanji.backend.word.Word;
import com.antoinecairey.kanji.backend.word.WordService;

@RestController
@RequestMapping("/api/kanji")
@RequiredArgsConstructor
public class KanjiController {
  private final KanjiService kanjiService;
  private final WordService wordService;

  @GetMapping
  public List<KanjiDTO> getAllKanjis() {
    return kanjiService.getAllKanjis();
  }

  @GetMapping("/{kanji}/words")
  public List<Word> getWordsContainingKanji(@PathVariable String kanji) {
    return wordService.getWordsContainingKanji(kanji);
  }
}
