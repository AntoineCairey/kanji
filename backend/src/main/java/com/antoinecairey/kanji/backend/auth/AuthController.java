package com.antoinecairey.kanji.backend.auth;

import com.antoinecairey.kanji.backend.user.User;
import com.antoinecairey.kanji.backend.user.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody User user) {
    userService.createUser(user);
    return ResponseEntity.ok("Utilisateur créé !");
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody User user) {
    LoginResponse loginResponse = userService.login(user.getUsername(), user.getPassword());
    return ResponseEntity.ok(loginResponse);
  }
}