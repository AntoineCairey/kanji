package com.antoinecairey.kanji.backend.card;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.antoinecairey.kanji.backend.kanji.Kanji;
import com.antoinecairey.kanji.backend.user.User;

public interface CardRepository extends JpaRepository<Card, Long> {

  // Trouver toutes les cartes d'un utilisateur
  List<Card> findByUserId(Long userId);

  // Trouver les cartes manquantes
  boolean existsByUserAndKanjiAndIsReverse(User user, Kanji kanji, boolean isReverse);

  // Trouver cartes à étudier aujourd'hui
  List<Card> findByUserIdAndLastReview(Long userId, LocalDate today);

  List<Card> findTop10ByUserIdAndLastReviewLessThanOrderByLastReviewAsc(Long userId, LocalDate today);

  List<Card> findTop10ByUserIdAndLastReviewNullOrderByIsReverseAsc(Long userId);

  // Compter cartes par niveau de maitrise (streak)

  Long countByUserIdAndStreakGreaterThanEqual(Long userId, Integer minStreak);

  Long countByUserIdAndStreakBetween(Long userId, Integer minStreak, Integer maxStreak);
  Long countByUserIdAndStreakLessThanEqualAndLastReviewNotNull(Long userId, Integer maxStreak);

  Long countByUserIdAndStreakLessThanEqual(Long userId, Integer maxStreak);
  Long countByUserIdAndLastReviewNull(Long userId);
}
