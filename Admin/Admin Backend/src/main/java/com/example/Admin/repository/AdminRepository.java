package com.example.Admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.example.Admin.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}
