package com.antoinecairey.kanji.backend.user;

import lombok.Data;
import jakarta.persistence.*;

@Data // Génère automatiquement getters, setters, equals, hashCode, toString
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String role;
}