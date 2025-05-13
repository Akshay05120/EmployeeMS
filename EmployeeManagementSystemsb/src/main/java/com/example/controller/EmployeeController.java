package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Employee;
import com.example.service.EmployeeService;


@RestController
@RequestMapping("/emp")
@CrossOrigin
public class EmployeeController {
	@Autowired
	EmployeeService eser;
	@GetMapping("/all")
	public List<Employee> getAllEmployees(){
		return eser.findall();
	}
	
	@GetMapping("/empdata/{id}")
	public Employee findbyid(@PathVariable Long id){
		return eser.findbyid(id);
	}
	
	@GetMapping("/findbyname/{name}")
	public List<Employee> findbyname(@PathVariable String name){
		return eser.findbyname(name);
	}
	
	@GetMapping("/findbydeptt/{dept}")
	public List<Employee> findbydept(@PathVariable String dept){
		return eser.findbydepartment(dept);
	}
	
	@GetMapping("/findbyrole/{role}")
	public List<Employee> findbyrole(@PathVariable String role) {
		return eser.findByrole(role);
	}
	

	
	


}
