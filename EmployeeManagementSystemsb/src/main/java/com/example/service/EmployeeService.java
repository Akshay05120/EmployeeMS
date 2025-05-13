package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Employee;
import com.example.repository.EmployeeRepository;

@Service
public class EmployeeService {
	@Autowired
	EmployeeRepository erepo;
	public String save(Employee e)
	{
		erepo.save(e);
		return "Employee Record added successfully";
	}
	public List<Employee>findall()
	{
		return erepo.findAll();
	}
	public Employee findbyid(long id)
	{
		return erepo.findById(id).orElse(null);
	}
	public List<Employee> findbyname(String name)
	{
		return erepo.findByName(name);
		
	}

	public List<Employee> findbydepartment(String department)
	{
		return erepo.findByDepartment(department);
		
	}
	public List<Employee>findByrole(String role){
		return erepo.findByRole(role);
	}
	public String deletebyid(long id)
	{
		erepo.deleteById(id);
		return "Record Deleted Successfully";
	}
	public String update(long id,Employee newemp)
	{
		Employee exsitingemp=erepo.findById(id).orElse(null);
		if(exsitingemp==null)
		{
			return "Record not found for update";
		}
		if(newemp.getName()==null && newemp.getEmail()==null
				&& newemp.getDepartment()==null && newemp.getRole()==null
				&& newemp.getSalary()==0.0)
		{
			return "Record is Empty";
		}
		if(newemp.getName()!=null)
		{
			exsitingemp.setName(newemp.getName());
		}
		if(newemp.getEmail()!=null)
		{
			exsitingemp.setEmail(newemp.getEmail());
		}
		if(newemp.getDepartment()!=null)
		{
			exsitingemp.setDepartment(newemp.getDepartment());
		}
		if(newemp.getRole()!=null)
		{
			exsitingemp.setRole(newemp.getRole());
		}
		if(newemp.getSalary()!=null)
		{
			exsitingemp.setSalary(newemp.getSalary());
		}
		erepo.save(exsitingemp);
		
		
		return "Record updated successfully !";
	}
	
	

}
