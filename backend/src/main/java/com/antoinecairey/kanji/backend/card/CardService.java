package com.antoinecairey.kanji.backend.card;

import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {
  private final CardRepository cardRepository;

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

  // Récupérer les cartes à réviser pour un utilisateur
  public List<Card> getCardsForToday(Long userId) {
    LocalDate today = LocalDate.now();
    List<Card> reviewed = cardRepository.findByUserIdAndLastReview(userId, today);
    List<Card> toReview = cardRepository.findTop10ByUserIdAndLastReviewLessThanOrderByLastReviewAsc(userId, today);
    List<Card> toDiscover = cardRepository.findTop10ByUserIdAndLastReviewNullOrderByIsReverseAsc(userId);
    List<Card> merged = Stream.of(reviewed, toReview, toDiscover)
        .flatMap(List::stream)
        .limit(10)
        .collect(Collectors.toList());
    return merged;
  }

}
