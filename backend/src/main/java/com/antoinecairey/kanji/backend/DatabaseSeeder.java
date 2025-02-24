/* package com.antoinecairey.kanji.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder {
  @Bean
  CommandLineRunner initDatabase(UserRepository userRepository) {
    return args -> {
      User user = new User();
      user.setName("Alice");
      user.setEmail("alice@example.com");
      userRepository.save(user);

      System.out.println("Utilisateur ajouté !");
    };
  }
} */