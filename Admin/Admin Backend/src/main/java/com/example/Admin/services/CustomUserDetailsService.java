package com.example.Admin.services;

import com.example.Admin.entity.Admin;
import com.example.Admin.repository.AdminRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository repo;

    public CustomUserDetailsService(AdminRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {

        Admin admin = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(admin.getEmail())
                .password(admin.getPassword())
                .roles(admin.getRole().name())
                .build();
    }
}
