package com.antoinecairey.kanji.backend.word;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "word")
public class Word {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String kanji;
  private String kana;
  private String fr;
  private Integer jlpt;
}
