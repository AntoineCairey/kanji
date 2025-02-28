package com.antoinecairey.kanji.backend.card;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {
  private final CardService cardService;
  private final CardInitService cardInitService;

  // Récupérer les cartes à réviser pour un utilisateur
  @GetMapping("/user/{userId}")
  public List<Card> getCardsToReview(@PathVariable Long userId) {
    return cardService.getCardsToReview(userId);
  }

  // Mettre à jour une carte après révision
  @PutMapping("/review/{cardId}")
  public Card updateCardAfterReview(@PathVariable Long cardId, @RequestParam boolean success) {
    return cardService.updateCardAfterReview(cardId, success);
  }

  @GetMapping("/unreviewed/{userId}")
  public ResponseEntity<List<Card>> getUnreviewedCards(@PathVariable Long userId) {
    List<Card> unreviewedCards = cardService.getUnreviewedCardsForUser(userId);
    return ResponseEntity.ok(unreviewedCards);
  }

  @PostMapping("/init")
  public ResponseEntity<String> generateMissingCards() {
    cardInitService.generateMissingCards();
    return ResponseEntity.ok("Cartes manquantes générées avec succès !");
  }
}
