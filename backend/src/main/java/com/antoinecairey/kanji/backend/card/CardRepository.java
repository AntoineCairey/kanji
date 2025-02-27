package com.antoinecairey.kanji.backend.card;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.antoinecairey.kanji.backend.kanji.Kanji;
import com.antoinecairey.kanji.backend.user.User;

public interface CardRepository extends JpaRepository<Card, Long> {

  // Trouver toutes les cartes d'un utilisateur
  List<Card> findByUserId(Long userId);

  // Trouver les cartes à réviser pour un utilisateur (nextReview <= aujourd'hui)
  List<Card> findByUserIdAndNextReviewLessThanEqual(Long userId, LocalDate today);

  boolean existsByUserAndKanjiAndIsReverse(User user, Kanji kanji, boolean isReverse);
  //boolean existsByUserAndKanji(User user, Kanji kanji);
}
