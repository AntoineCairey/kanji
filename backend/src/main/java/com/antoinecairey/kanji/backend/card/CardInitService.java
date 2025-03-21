package com.antoinecairey.kanji.backend.card;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.antoinecairey.kanji.backend.kanji.Kanji;
import com.antoinecairey.kanji.backend.kanji.KanjiRepository;
import com.antoinecairey.kanji.backend.user.User;
import com.antoinecairey.kanji.backend.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardInitService {
  private final CardRepository cardRepository;
  private final KanjiRepository kanjiRepository;
  private final UserRepository userRepository;

  @Transactional
  public void initializeCardsForUser(User user) {
    List<Kanji> allKanjis = kanjiRepository.findAll(); // Récupère tous les kanjis

    for (Kanji kanji : allKanjis) {
      // Carte en mode "forward" (kanji → sens)
      Card forwardCard = new Card();
      forwardCard.setUser(user);
      forwardCard.setKanji(kanji);
      // forwardCard.setReverse(false);
      cardRepository.save(forwardCard);

      // Carte en mode "reverse" (sens → kanji)
      /*
       * Card reverseCard = new Card();
       * reverseCard.setUser(user);
       * reverseCard.setKanji(kanji);
       * reverseCard.setReverse(true);
       * cardRepository.save(reverseCard);
       */
    }
  }

  @Transactional
  public void generateMissingCards() {
    List<User> users = userRepository.findAll(); // Récupère tous les utilisateurs
    List<Kanji> kanjis = kanjiRepository.findAll(); // Récupère tous les kanjis

    for (User user : users) {
      for (Kanji kanji : kanjis) {
        // Vérifie si la carte en mode "forward" existe déjà
        if (!cardRepository.existsByUserAndKanjiAndIsReverse(user, kanji, false)) {
          Card forwardCard = new Card();
          forwardCard.setUser(user);
          forwardCard.setKanji(kanji);
          // forwardCard.setReverse(false);
          cardRepository.save(forwardCard);
        }

        // Vérifie si la carte en mode "reverse" existe déjà
        /*
         * if (!cardRepository.existsByUserAndKanjiAndIsReverse(user, kanji, true)) {
         * Card reverseCard = new Card();
         * reverseCard.setUser(user);
         * reverseCard.setKanji(kanji);
         * reverseCard.setReverse(true);
         * cardRepository.save(reverseCard);
         * }
         */
      }
    }
  }
}
