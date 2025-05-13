import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './App.css';

export default function AdminDash() {
    let [employees, setEmployees] = useState([]);
    let [isShowupdateform, setIsShowupdateform] = useState(false);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [department, setDepartment] = useState("");  
    let [role, setRole] = useState("");
    let [salary, setSalary] = useState(0.0);
    let [img, setImg] = useState(null);
    let [id, setId] = useState("");
    let [searchResult, setSearchResult] = useState([]);
    var app="http://56.228.18.59:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";
    // const app = "http://localhost:8080";


    var fetchdata = () => {
        axios.get(`${app}/admin/getallemp`)
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log("Error occurred " + error);
            });
    };

    useEffect(() => {
        fetchdata();
    }, []);

    let deleteemployee = (id) => {
        axios.delete(`${app}/admin/delete/${id}`)
            .then(response => {
                alert('Employee deleted successfully!');
                setEmployees(employees.filter(emp => emp.id !== id)); 
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    let showupdateform = (employee) => {
        setId(employee.id);
        setName(employee.name);
        setRole(employee.role);
        setSalary(employee.salary);
        setDepartment(employee.department);
        setEmail(employee.email);
        setImg(employee.img);
        setIsShowupdateform(true);
    };

    let handleimg = (e) => {
        var file = e.target.files[0];
        var fullname = `/img/${file.name}`;
        console.log("Image address is " + fullname);
        setImg(fullname);
    };

    let updateemp = (e) => {
        e.preventDefault();
        let updatedemp = { name, email, role, department, salary, img };
        axios.put(`${app}/admin/update/${id}`, updatedemp)
            .then((response) => {
                if (response.data) {
                    alert('Employee updated successfully!');
                    fetchdata();
                    setIsShowupdateform(false); // Hide the form after update
                }
            })
            .catch((error) => {
                console.error('Error updating employee:', error);
            });
    };

    let handleSearchbyname = () => { 
        axios.get(`${app}/emp/findbyname/${name}`)
        .then((response) => {
            setSearchResult(response.data);
        })
        .catch((error) => { console.log("Error occurred: " + error); });
    };

    let handleSearchbydpt = () => { 
        axios.get(`${app}/emp/findbydeptt/${department}`)
        .then((response) => {
            setSearchResult(response.data);
        })
        .catch((error) => { console.log("Error occurred: " + error); });
    };

    let handleSearchbyrole = () => { 
        axios.get(`${app}/emp/findbyrole/${role}`)
        .then((response) => {
            setSearchResult(response.data);
        })
        .catch((error) => { console.log("Error occurred: " + error); });
    };

    return (
        <div>
            <NavBar />
            <h1 className="text-danger text-center mt-4 display-3">Welcome to Admin Dashboard</h1>

            {/* Search Section */}
            <div className="container">
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Enter name to search" 
                            onChange={(e) => setName(e.target.value)} value={name} />
                        <button className="btn btn-primary mt-2 w-100" onClick={handleSearchbyname}>Search</button>
                    </div>

                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Enter department to search" 
                            onChange={(e) => setDepartment(e.target.value)} value={department} />
                        <button className="btn btn-primary mt-2 w-100" onClick={handleSearchbydpt}>Search</button>
                    </div>

                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Enter role to search" 
                            onChange={(e) => setRole(e.target.value)} value={role} />
                        <button className="btn btn-primary mt-2 w-100" onClick={handleSearchbyrole}>Search</button>
                    </div>
                </div>
            </div>

            {/* Display Employee Cards */}
            <div className="container mt-4">
                <div className="row">
                    {(searchResult.length > 0 ? searchResult : employees).map((employee) => (
                        <div className="col-md-3 col-sm-6 col-12 mb-4" key={employee.id}>
                            <div className="card shadow-lg">
                                <img src={employee.img} className="card-img-top rounded-circle mx-auto mt-3"
                                    alt={`Image of ${employee.name}`} style={{ width: "150px", height: "150px", objectFit: "cover", border: "5px solid #fff" }} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{employee.name}</h5>
                                    <p className="card-text"><strong>Department:</strong> {employee.department}</p>
                                    <p className="card-text"><strong>Role:</strong> {employee.role}</p>
                                    <p className="card-text"><strong>Email:</strong> {employee.email}</p>
                                    <p className="card-text"><strong>Salary:</strong> {employee.salary}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => deleteemployee(employee.id)}>Delete</button>
                                        <button className="btn btn-warning" onClick={() => showupdateform(employee)}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Update Employee Form */}
            {isShowupdateform && (
                <div className="container mt-4">
                    <div className="card w-50 mx-auto p-3 shadow-sm rounded-3">
                        <h4 className="text-center text-primary">Update Employee</h4>
                        <form onSubmit={updateemp}>
                            <div className="mb-2">
                                <label className="form-label">Name:</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-2">
                                <label className="form-label">Email:</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="mb-2">
                                <label className="form-label">Department:</label>
                                <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
                            </div>

                            <div className="mb-2">
                                <label className="form-label">Role:</label>
                                <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} />
                            </div>

                            <div className="mb-2">
                                <label className="form-label">Salary:</label>
                                <input type="number" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} />
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-success btn-sm">Update</button>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsShowupdateform(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
