package com.antoinecairey.kanji.backend.auth;

import com.antoinecairey.kanji.backend.user.User;
import com.antoinecairey.kanji.backend.user.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash du mot de passe
    user.setRole("USER");
    userRepository.save(user);
    return ResponseEntity.ok("Utilisateur créé !");
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody User user) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

    String token = jwtUtil.generateToken(user.getUsername());

    // Retourne un objet LoginResponse avec le token et le username
    LoginResponse loginResponse = new LoginResponse(token, user.getUsername());
    return ResponseEntity.ok(loginResponse); // Spring se charge de convertir en JSON
  }
}