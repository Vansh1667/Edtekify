package com.example.Admin.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.Admin.entity.Role;
import com.example.Admin.entity.Admin;
import com.example.Admin.repository.AdminRepository;

@Component
public class SuperAdminInitializer implements CommandLineRunner{
	
	    private final AdminRepository repo;
	    private final PasswordEncoder encoder;

	    public SuperAdminInitializer(AdminRepository repo, PasswordEncoder encoder) {
	        this.repo = repo;
	        this.encoder = encoder;
	    }

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		
		if (repo.findByEmail("superadmin@gmail.com").isEmpty()) {

            Admin admin = new Admin();
            admin.setEmail("superadmin@gmail.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole(Role.SUPER_ADMIN);

            repo.save(admin);

            System.out.println("✅ Super Admin Created");
        }
	}

}
