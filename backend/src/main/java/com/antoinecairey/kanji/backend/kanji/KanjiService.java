package com.antoinecairey.kanji.backend.kanji;

import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KanjiService {
  private final KanjiRepository repository;

  public List<KanjiDTO> getAllKanjis() {
    return repository.findAll().stream()
        .map(KanjiMapper.INSTANCE::toDto)
        .toList();
  }
}
