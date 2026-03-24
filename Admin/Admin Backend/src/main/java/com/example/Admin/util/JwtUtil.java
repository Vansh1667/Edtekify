package com.example.Admin.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    
	// NOTE: HS256 requires a key size >= 256 bits; keep this long enough.
	private static final String SECRET = "mysecretkeymysecretkeymysecretkeymysecretkey";

	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
	}

	    public String generateToken(String email) {
	    	Date issuedAt = new Date();
	        Date expiration = new Date(System.currentTimeMillis() + 1000L * 60 * 60);

	        return Jwts.builder()
	                .subject(email)
	                .issuedAt(issuedAt)
	                .expiration(expiration)
	                .signWith(getSigningKey())
	                .compact();
	    }

	    public String extractEmail(String token) {
	        return Jwts.parser()
	                .verifyWith(getSigningKey())
	                .build()
	                .parseSignedClaims(token)
	                .getPayload()
	                .getSubject();
	    }
}
