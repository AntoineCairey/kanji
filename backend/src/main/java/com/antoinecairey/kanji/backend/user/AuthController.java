package com.antoinecairey.kanji.backend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;

  public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash du mot de passe
    user.setRole("USER");
    userRepository.save(user);
    return ResponseEntity.ok("Utilisateur créé !");
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody User user) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

    String token = jwtUtil.generateToken(user.getUsername());
    return ResponseEntity.ok(token);
  }
}