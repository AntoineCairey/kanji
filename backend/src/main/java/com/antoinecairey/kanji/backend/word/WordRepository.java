package com.antoinecairey.kanji.backend.word;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
  List<Word> findByKanjiContaining(String kanji);
}
