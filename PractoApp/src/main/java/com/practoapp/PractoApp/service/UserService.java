package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.entity.User;
import com.practoapp.PractoApp.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Create a new user (hashes the password before saving)
    @Transactional
    public User createUser(User user) {
        user.setUserPd(passwordEncoder.encode(user.getUserPd()));
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user details. If a new password is provided, it is hashed before saving.
    @Transactional
    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);
        user.setUserName(updatedUser.getUserName());
        if (updatedUser.getUserPd() != null && !updatedUser.getUserPd().isEmpty()) {
            user.setUserPd(passwordEncoder.encode(updatedUser.getUserPd()));
        }
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    // Login method: verifies the password for a given username
    public User login(String username, String rawPassword) {
        List<User> users = userRepository.findByUserName(username);
        for (User user : users) {
            if (passwordEncoder.matches(rawPassword, user.getUserPd())) {
                return user;
            }
        }
        throw new EntityNotFoundException("Invalid credentials");
    }
}
