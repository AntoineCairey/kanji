package com.antoinecairey.kanji.backend.user;

// import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.antoinecairey.kanji.backend.auth.JwtUtil;

@RestController
@RequestMapping("/api/users")
// @CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        return userService.getUserDtoByUsername(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /*
     * @GetMapping
     * public List<UserDTO> getAllUsers() {
     * return userService.getAllUsers();
     * }
     * 
     * @GetMapping("/{id}")
     * public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
     * return userService.getUserById(id)
     * .map(ResponseEntity::ok)
     * .orElseGet(() -> ResponseEntity.notFound().build());
     * }
     * 
     * @PostMapping
     * public User addUser(@RequestBody UserDTO dto) {
     * return userService.addUser(dto);
     * }
     * 
     * @DeleteMapping("/{id}")
     * public void deleteUser(@PathVariable Long id) {
     * userService.deleteUser(id);
     * }
     */
}