package com.antoinecairey.kanji.backend.kanji;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Optional;
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

  public Optional<KanjiDTO> getKanjiById(Long id) {
    return repository.findById(id)
        .map(KanjiMapper.INSTANCE::toDto);
  }

  public Kanji addKanji(KanjiDTO kanjiDTO) {
    Kanji kanji = KanjiMapper.INSTANCE.toEntity(kanjiDTO);
    return repository.save(kanji);
  }

  public void deleteKanji(Long id) {
    repository.deleteById(id);
  }
}
