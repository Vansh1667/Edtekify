package com.example.Admin.services;

import org.springframework.http.ResponseEntity;

import com.example.Admin.dto.SignupRequest;

public interface AuthService {

    ResponseEntity<?> signup(SignupRequest request);
}
