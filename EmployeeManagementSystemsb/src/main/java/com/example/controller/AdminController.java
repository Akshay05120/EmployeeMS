package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Employee;
import com.example.service.EmployeeService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	@Autowired
	EmployeeService eser;
	
	@GetMapping("/hi")
	public String greet()
	{
		return "Hello Welcome";
	}
	
	@GetMapping("/getallemp")
	public List<Employee> getAllEmployees()
	{
		return eser.findall();
	}
	
	@PostMapping("/saveemp")
	public String saveEmployee(@RequestBody Employee employee)
	{
		return eser.save(employee);
	}
	@GetMapping("findemp/{id}")
	public Employee getEmployeeById(@PathVariable long id)
	{
		return eser.findbyid(id);
	}
	@GetMapping("/findbyname/{name}")
	public List<Employee> findempbyname(@PathVariable String name)
	{
		return eser.findbyname(name);
	}
	@GetMapping("/findbydept/{dept}")
	public List<Employee> findempbydept(@PathVariable String dept)
	{
		return eser.findbydepartment(dept);
	}
	@GetMapping("/findbyrole/{role}")
	public List<Employee> findempbyrole(@PathVariable String role) {
		return eser.findByrole(role);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteEmployee(@PathVariable long id)
	{
		 eser.deletebyid(id);
	}
	@PutMapping("/update/{id}")
    public String updateEmployee(@PathVariable int id, @RequestBody Employee employee) {
        return eser.update(id, employee);
    }

	

}
