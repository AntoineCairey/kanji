package com.antoinecairey.kanji.backend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data // Génère automatiquement getters, setters, equals, hashCode, toString
@Table("users") // Correspond à la table dans la BDD
public class User {
  @Id
  private Long id;
  private String name;
  private String email;
}