package com.antoinecairey.kanji.backend.user;

import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

    return new org.springframework.security.core.userdetails.User(
        user.getUsername(),
        user.getPassword(),
        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole())) // ROLE_USER ou ROLE_ADMIN
    );
  }

  public List<UserDTO> getAllUsers() {
    return userRepository.findAll().stream()
        .map(UserMapper.INSTANCE::toDto)
        .toList();
  }

  public Optional<UserDTO> getUserById(Long id) {
    return userRepository.findById(id)
        .map(UserMapper.INSTANCE::toDto);
  }

  public User addUser(UserDTO userDTO) {
    User user = UserMapper.INSTANCE.toEntity(userDTO);
    return userRepository.save(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

}