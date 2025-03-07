package com.antoinecairey.kanji.backend.kanji;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "kanji")
public class Kanji {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 1)
  private String symbol;

  @Column(nullable = false)
  private String fr;

  private String kun;
  private String onn;
  private Integer jlpt;
}
