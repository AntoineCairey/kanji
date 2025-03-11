package com.antoinecairey.kanji.backend.card;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.antoinecairey.kanji.backend.auth.JwtUtil;
import com.antoinecairey.kanji.backend.user.User;
import com.antoinecairey.kanji.backend.user.UserService;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {
  private final CardService cardService;
  private final CardInitService cardInitService;
  private final JwtUtil jwtUtil;
  private final UserService userService;

  // Récupérer les cartes à réviser pour l'utilisateur connecté
  @GetMapping("/review")
  public List<Card> getCardsToReview(@RequestHeader("Authorization") String authHeader) {
    String token = authHeader.substring(7);
    String username = jwtUtil.extractUsername(token);
    User user = userService.getUserByUsername(username)
        .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    return cardService.getCardsForToday(user.getId());
  }

  @GetMapping("/discover")
  public List<Card> getCardsToDiscover(@RequestHeader("Authorization") String authHeader) {
    String token = authHeader.substring(7);
    String username = jwtUtil.extractUsername(token);
    User user = userService.getUserByUsername(username)
        .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    return cardService.getCardsToDiscover(user.getId());
  }

  // Mettre à jour une carte après révision
  @PutMapping("/review/{cardId}")
  public Card updateCardAfterReview(@PathVariable Long cardId, @RequestParam boolean success) {
    return cardService.updateCardAfterReview(cardId, success);
  }

  @PostMapping("/init")
  public ResponseEntity<String> generateMissingCards() {
    cardInitService.generateMissingCards();
    return ResponseEntity.ok("Cartes manquantes générées avec succès !");
  }
}
