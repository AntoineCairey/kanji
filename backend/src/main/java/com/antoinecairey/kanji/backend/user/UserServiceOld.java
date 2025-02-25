package com.antoinecairey.kanji.backend.user;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceOld {
    private final UserRepository repository;

    public UserServiceOld(UserRepository repository) {
        this.repository = repository;
    }

    public List<UserDTO> getAllUsers() {
        return repository.findAll().stream()
                .map(UserMapper.INSTANCE::toDto)
                .toList();
    }

    public Optional<UserDTO> getUserById(Long id) {
        return repository.findById(id)
                .map(UserMapper.INSTANCE::toDto);
    }

    public User addUser(UserDTO userDTO) {
        User user = UserMapper.INSTANCE.toEntity(userDTO);
        return repository.save(user);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}
