package com.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="emp_info")
public class Employee {
	@Id  
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long id;
    String name;
    String email;
    String department;
    String role;
    Double salary;
    String img;
	public Employee() {
		super();
	}
	public Employee(long id, String name, String email, String department, String role, Double salary, String img) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.department = department;
		this.role = role;
		this.salary = salary;
		this.img = img;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Double getSalary() {
		return salary;
	}
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	

}
