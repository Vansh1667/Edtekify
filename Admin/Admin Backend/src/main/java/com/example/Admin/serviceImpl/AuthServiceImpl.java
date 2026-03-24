package com.example.Admin.serviceImpl;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Admin.dto.SignupRequest;
import com.example.Admin.entity.Admin;
import com.example.Admin.entity.Role;
import com.example.Admin.repository.AdminRepository;
import com.example.Admin.services.AuthService;
import com.example.Admin.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public ResponseEntity<?> signup(SignupRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required"));
        }

        String normalizedEmail = request.getEmail().trim();
        if (adminRepository.findByEmail(normalizedEmail).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already exists"));
        }

        Admin admin = new Admin();
        admin.setEmail(normalizedEmail);
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setRole(Role.ORG_ADMIN);
        adminRepository.save(admin);

//        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Signup successful" ));
    }
}
