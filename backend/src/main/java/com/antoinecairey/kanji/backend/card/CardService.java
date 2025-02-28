package com.antoinecairey.kanji.backend.card;

import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {
  private final CardRepository cardRepository;

  // Récupérer les cartes à réviser pour un utilisateur
  public List<Card> getCardsToReview(Long userId) {
    LocalDate today = LocalDate.now();
    return cardRepository.findByUserIdAndNextReviewLessThanEqual(userId, today);
  }

  // Mettre à jour une carte après révision
  public Card updateCardAfterReview(Long cardId, boolean isSuccessful) {
    Card card = cardRepository.findById(cardId)
        .orElseThrow(() -> new RuntimeException("Carte non trouvée"));

    if (isSuccessful) {
      card.setStreak(card.getStreak() + 1);
    } else {
      card.setStreak(0);
    }

    LocalDate today = LocalDate.now();
    card.setLastReview(today);
    card.setNextReview(today.plusDays((long) Math.pow(2, card.getStreak())));

    return cardRepository.save(card);
  }

  // Récupérer les cartes non révisées pour un utilisateur
  public List<Card> getUnreviewedCardsForUser(Long userId) {
    return cardRepository.findTop5UnreviewedCardsForUser(userId);
  }
}
