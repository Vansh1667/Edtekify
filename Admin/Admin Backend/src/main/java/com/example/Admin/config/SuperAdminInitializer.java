package com.example.Admin.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.Admin.entity.Role;
import com.example.Admin.entity.User;
import com.example.Admin.repository.UserRepository;

@Component
public class SuperAdminInitializer implements CommandLineRunner{
	
	    private final UserRepository repo;
	    private final PasswordEncoder encoder;

	    public SuperAdminInitializer(UserRepository repo, PasswordEncoder encoder) {
	        this.repo = repo;
	        this.encoder = encoder;
	    }

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		
		if (repo.findByEmail("superadmin@gmail.com").isEmpty()) {

            User user = new User();
            user.setEmail("superadmin@gmail.com");
            user.setPassword(encoder.encode("admin123"));
            user.setRole(Role.SUPER_ADMIN);

            repo.save(user);

            System.out.println("✅ Super Admin Created");
        }
	}

}
