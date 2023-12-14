package com.web.mindtrackproject.controller;

import com.web.mindtrackproject.entity.User;
import com.web.mindtrackproject.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/sign-in")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("RequestBody received: " + user);

        User createdUser = userService.createUser(user);
        return ResponseEntity.status(200).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) throws Exception {
        try {
            String email = user.getEmail();
            String password = user.getPassword();
            User authenticatedUser = userService.loginUser(email, password);
            return ResponseEntity.ok(authenticatedUser);
        } catch (Exception e) {
            throw e;
        }
    }
}
