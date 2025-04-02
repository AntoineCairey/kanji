package com.antoinecairey.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.antoinecairey.kanji.backend.user.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserService userService;

  @Test
  void getUserByUsername_ShouldReturnUser_WhenUserExists() {
    // GIVEN
    User user = new User(1L, "john", "pwd", "USER");
    when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));

    // WHEN
    User result = userService.getUserByUsername("john");

    // THEN
    assertEquals("pwd", result.getPassword());
    verify(userRepository, times(1)).findByUsername("john");
  }

  @Test
  void getUserByUsername_ShouldThrowException_WhenUserNotFound() {
    when(userRepository.findByUsername("john")).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> userService.getUserByUsername("john"));
  }
}