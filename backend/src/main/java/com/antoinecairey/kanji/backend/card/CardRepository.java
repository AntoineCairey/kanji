package com.antoinecairey.kanji.backend.card;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.antoinecairey.kanji.backend.kanji.Kanji;
import com.antoinecairey.kanji.backend.user.User;

public interface CardRepository extends JpaRepository<Card, Long> {

  // Trouver toutes les cartes d'un utilisateur
  List<Card> findByUserId(Long userId);

  // Trouver les cartes à réviser pour un utilisateur (nextReview <= aujourd'hui)
  List<Card> findByUserIdAndNextReviewLessThanEqual(Long userId, LocalDate today);

  // Récupérer les cartes non révisées pour un utilisateur
  @Query(value = "SELECT * FROM card WHERE user_id = :userId AND last_review IS NULL ORDER BY is_reverse ASC LIMIT 5", nativeQuery = true)
  List<Card> findTop5UnreviewedCardsForUser(@Param("userId") Long userId);

  // Trouver les cartes manquantes
  boolean existsByUserAndKanjiAndIsReverse(User user, Kanji kanji, boolean isReverse);
}
