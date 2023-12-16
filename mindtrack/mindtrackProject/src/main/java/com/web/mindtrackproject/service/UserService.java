package com.web.mindtrackproject.service;

import com.web.mindtrackproject.entity.User;
import com.web.mindtrackproject.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.web.mindtrackproject.service.NoteService;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements Observer{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final NoteService noteService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        User savedUser = userRepository.save(user);
        // Após criar o usuário, registre o UserService como observador
        noteService.addObserver(savedUser);
        return savedUser;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User loginUser(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new Exception("Email e/ou senha inválidos.");
        }
    }

    @Override
    public void update() {
        //TODO
        // Lógica para reagir a mudanças nas notas
    }
}
