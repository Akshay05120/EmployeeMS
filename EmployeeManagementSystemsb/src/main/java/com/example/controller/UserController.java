package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.LoginDto;
import com.example.entity.User;
import com.example.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	UserService userv;
	
	@PostMapping("/register")
	public ResponseEntity<String> save(@RequestBody User u) {
	    // Check if all fields are filled
	    if (u.getUsername() == null || u.getUsername().isEmpty() ||
	        u.getEmail() == null || u.getEmail().isEmpty() ||
	        u.getContactno() == null || u.getPassword() == null || u.getPassword().isEmpty() ||
	        u.getUrole() == null || u.getUrole().isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required.");
	    }

	    // Validate contact number length (assuming it should be 10 digits)
	    if (u.getContactno() != null && u.getContactno().toString().length() != 10) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Contact number must be exactly 10 digits.");
	    }

	    return ResponseEntity.ok(userv.save(u));
	}


	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto logindto)
	{
		if (logindto.getUsername() == null || logindto.getUsername().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is required");
        }

        if (logindto.getPassword() == null || logindto.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is required");
        }

       
        User user = userv.login(logindto.getUsername(), logindto.getPassword());
        
        if (user != null) {
            // If login is successful, return the user object with additional info (e.g., user role, username)
            return ResponseEntity.ok(user);
        } else {
            // Return 401 if login credentials are invalid
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
	

}
