package com.antoinecairey.kanji.backend.card;

import java.util.List;
import java.util.Map;

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

  // Mettre à jour une carte après révision
  @PutMapping("/review/{cardId}")
  public Card updateCardAfterReview(@PathVariable Long cardId, @RequestParam boolean success) {
    return cardService.updateCardAfterReview(cardId, success);
  }

  // Générer les cartes manquantes en BDD
  @PostMapping("/init")
  public ResponseEntity<String> generateMissingCards() {
    cardInitService.generateMissingCards();
    return ResponseEntity.ok("Cartes manquantes générées avec succès !");
  }

  // Cartes d'un user
  @GetMapping("/me")
  public List<Card> getUserCards(@RequestHeader("Authorization") String authHeader) {
    String token = authHeader.substring(7);
    String username = jwtUtil.extractUsername(token);
    User user = userService.getUserByUsername(username)
        .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    return cardService.getUserCards(user.getId());
  }

  @GetMapping("/stats")
  public ResponseEntity<Map<String, Long>> getMasteryStats(@RequestHeader("Authorization") String authHeader) {
    String token = authHeader.substring(7);
    String username = jwtUtil.extractUsername(token);
    User user = userService.getUserByUsername(username)
        .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    return ResponseEntity.ok(cardService.getMasteryStats(user.getId()));
  }

}
