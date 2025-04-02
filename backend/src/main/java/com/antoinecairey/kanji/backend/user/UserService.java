package com.antoinecairey.kanji.backend.user;

// import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.antoinecairey.kanji.backend.auth.JwtUtil;
import com.antoinecairey.kanji.backend.auth.LoginResponse;
import com.antoinecairey.kanji.backend.card.CardInitService;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final CardInitService cardInitService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;

  public User createUser(User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
      throw new RuntimeException("Le nom d'utilisateur est déjà pris.");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRole("USER");
    User savedUser = userRepository.save(user);
    cardInitService.initializeCardsForUser(savedUser);
    return savedUser;
  }

  public LoginResponse login(String username, String password) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, password));
    String token = jwtUtil.generateToken(username);
    return new LoginResponse(token, username);
  }

  public User getUserByUsername(String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new UserNotFoundException("User '" + username + "' not found"));
  }

  public Optional<UserDTO> getUserDtoByUsername(String username) {
    return userRepository.findByUsername(username)
        .map(UserMapper.INSTANCE::toDto);
  }

  /*
   * public List<UserDTO> getAllUsers() {
   * return userRepository.findAll().stream()
   * .map(UserMapper.INSTANCE::toDto)
   * .toList();
   * }
   * 
   * public Optional<UserDTO> getUserById(Long id) {
   * return userRepository.findById(id)
   * .map(UserMapper.INSTANCE::toDto);
   * }
   *
   * public User addUser(UserDTO userDTO) {
   * User user = UserMapper.INSTANCE.toEntity(userDTO);
   * return userRepository.save(user);
   * }
   * 
   * public void deleteUser(Long id) {
   * userRepository.deleteById(id);
   * }
   */

}