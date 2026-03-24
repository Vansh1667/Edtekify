package com.example.Admin.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

import com.example.Admin.services.CustomUserDetailsService;
import com.example.Admin.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	
	    private final JwtUtil jwtUtil;
	    private final CustomUserDetailsService service;

	    public JwtFilter(JwtUtil jwtUtil, CustomUserDetailsService service) {
	        this.jwtUtil = jwtUtil;
	        this.service = service;
	    }

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);
            try {
	            String email = jwtUtil.extractEmail(token);

	            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	                var userDetails = service.loadUserByUsername(email);

	                var auth = new UsernamePasswordAuthenticationToken(
	                        userDetails, null, userDetails.getAuthorities());
	                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

	                SecurityContextHolder.getContext().setAuthentication(auth);
	            }
			} catch (Exception ignored) {
				// Invalid/expired JWTs should not break the request.
			}
        }

        filterChain.doFilter(request, response);
		
	}

}
