import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import EmpNav from './EmpNav';
import './App.css';

export default function EmployeeDash() {
     let [employees, setEmployees] = useState([]);
     let[serchResult,setserachResult]=useState([]);
     let[name,setName]=useState("");
     let[department,setDepartment]=useState("");
     let[role,setRole]=useState("");
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
    }

    useEffect(() => {
        fetchdata();
    }, []);

    let handleSearchbyname = () => { 
    axios.get(`${app}/emp/findbyname/${name}`)
    .then((response)=>{
        setserachResult(response.data);
    })
    .catch((error)=>{console.log("error occured"+error)})
   }

   let handleSearchbydpt = () => { 
    axios.get(`${app}/emp/findbydeptt/${department}`)
    .then((response)=>{
        setserachResult(response.data);
    })
    .catch((error)=>{console.log("error occured"+error)})
   }

   let handleSearchbyrole = () => { 
    axios.get(`${app}/emp/findbyrole/${role}`)
    .then((response)=>{
        setserachResult(response.data);
    })
    .catch((error)=>{console.log("error occured"+error)})
   }

  return (
    <div>
  <EmpNav />
  <h1 className="text-danger text-center mt-4 display-4">Welcome to Employee Dashboard</h1>

  <div className="container">
    <div className="row">
      
      {/* Search by Name */}
      <div className="col-md-4 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter name to search"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button className="btn btn-primary w-100 mt-2" onClick={handleSearchbyname}>
          Search
        </button>
      </div>

      {/* Search by Department */}
      <div className="col-md-4 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter department to search"
          onChange={(e) => setDepartment(e.target.value)}
          value={department}
        />
        <button className="btn btn-primary w-100 mt-2" onClick={handleSearchbydpt}>
          Search
        </button>
      </div>

      {/* Search by Role */}
      <div className="col-md-4 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter role to search"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        />
        <button className="btn btn-primary w-100 mt-2" onClick={handleSearchbyrole}>
          Search
        </button>
      </div>
    </div>
  </div>

  {/* Employee List */}
  <div className="container">
    <div className="row">
      {(serchResult.length > 0 ? serchResult : employees).map((employee) => (
        <div className="col-md-3 col-sm-6 col-12 mb-4" key={employee.id}>
          <div className="card shadow-lg">
            <img
              src={employee.img}
              className="card-img-top mx-auto mt-3"
              alt={`Image of ${employee.name}`}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "50%",
                border: "5px solid #fff",
              }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{employee.name}</h5>
              <p className="card-text">
                <strong>Department:</strong> {employee.department} <br />
                <strong>Role:</strong> {employee.role} <br />
                <strong>Email:</strong> {employee.email} <br />
                <strong>Salary:</strong> {employee.salary}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}
