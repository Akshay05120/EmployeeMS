package com.example.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository urepo;
	public String save(User u)
	{
		User exsitingUser=urepo.findByUsername(u.getUsername()).orElse(null);
		if(exsitingUser!=null)
		{
			return "User name is already exist. Please try another one";
		}
		else
			urepo.save(u);
		return "User Register successfully";
			
	}
	public User login(String username,String password)
	{
		User user=urepo.findByUsername(username).orElse(null);
		if(user!=null)
		{
			if(user.getPassword().equals(password))
			{
				return user;
			}
		}
		return null;
	}
}
