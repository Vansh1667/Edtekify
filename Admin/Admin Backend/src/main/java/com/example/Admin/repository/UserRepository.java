package com.example.Admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.example.Admin.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {
     Optional<User> findByEmail(String email);
}
