package com.example.Admin.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Admin.dto.LoginRequest;
import com.example.Admin.dto.SignupRequest;
import com.example.Admin.services.AuthService;
import com.example.Admin.util.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController { 
    
	private final AuthenticationManager authManager;
	private final JwtUtil jwtUtil;
	private final AuthService authService;

	public AuthController(
			AuthenticationManager authManager,
			JwtUtil jwtUtil,
			AuthService authService) {
		this.authManager = authManager;
		this.jwtUtil = jwtUtil;
		this.authService = authService;
	}

	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

	        authManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        request.getEmail(),
	                        request.getPassword()
	                )
	        );

	        String token = jwtUtil.generateToken(request.getEmail());

	        return ResponseEntity.ok(Map.of("token", token));
	    }

	    @PostMapping("/signup")
	    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
	        return authService.signup(request);
	    }
}
