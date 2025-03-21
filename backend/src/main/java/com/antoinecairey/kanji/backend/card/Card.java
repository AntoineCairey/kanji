package com.antoinecairey.kanji.backend.card;

import com.antoinecairey.kanji.backend.kanji.Kanji;
import com.antoinecairey.kanji.backend.user.User;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "kanji_id", nullable = false)
    private Kanji kanji;

    @Column(nullable = false)
    private Boolean isReverse = false;

    @Column(nullable = false)
    private Integer streak = 0;

    @Temporal(TemporalType.DATE)
    private LocalDate lastReview;

    @Temporal(TemporalType.DATE)
    private LocalDate nextReview;
}