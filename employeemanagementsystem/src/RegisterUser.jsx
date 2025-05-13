import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import './App.css';

export default function RegisterUser() {
  let [islogin,setIslogin]=useState(false);
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [contactno, setContactno] = useState("");
    let [urole, setUrole] = useState("");
    let navigate = useNavigate();
    var app="http://56.228.18.59:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";
    // const app = "http://localhost:8080";


    let registeruser = (event) => {
      event.preventDefault();
  
      // Check if any field is empty
      if (!username || !email || !contactno || !password || !urole) {
          alert("Please fill in all the fields.");
          return;  // Stop the form submission
      }
  
      // Convert contactno to string and check the length (assuming it should be 10 digits)
      if (contactno.toString().length !== 10) {
          alert("Contact number must be exactly 10 digits.");
          return;  // Stop form submission
      }
  
      let newuser = { username, email, contactno, password, urole };
  
      axios.post(`${app}/user/register`, newuser)
          .then((response) => {
              if (response.data) {
                  alert("Record added successfully");
                  // Clear the form after successful registration
                  setUsername('');
                  setEmail('');
                  setPassword('');
                  setContactno('');
                  setUrole('');
              }
          })
          .catch((error) => {
              // Error handling
              if (error.response) {
                  alert(`Error: ${error.response.data}`);  // Display the backend error message
              } else {
                  alert("Network error, please try again later.");
              }
              console.log("Error occurred: " + error);
          });
  };
  
    let loginuser = (event) => {
      event.preventDefault();
      let logindata = { username, password };
  
      axios.post(`${app}/user/login`, logindata)
          .then((response) => {
              localStorage.setItem("userdata", JSON.stringify(response.data));
              console.log(localStorage.getItem("userdata"));
              var User = JSON.parse(localStorage.getItem("userdata"));
  
              if (User.urole === "admin") {
                  navigate("/admindashbord");
              } else {
                  navigate("/employeedashbord");
              }
              alert("Login Successful");
          })
          .catch((error) => {
              // Check if error.response exists (meaning error is from server)
              if (error.response) {
                  // Extract the error message from the response data
                  const errorMessage = error.response.data || "An unknown error occurred";
                  alert(`Error: ${errorMessage}`);
              } else {
                  // If the error is a network or other issue (not related to response)
                  alert("Network error, please try again later.");
              }
          });
  };
  
    
  return (
    <div className="container mt-4">
  <h2 className="text-center text-primary mb-3">Registration</h2>

  {islogin === false ? (
    <form className="w-50 mx-auto p-3 shadow-sm rounded-3 bg-light" onSubmit={registeruser}>
      <div className="mb-2">
        <label className="form-label">Username:</label>
        <input type="text" className="form-control" placeholder="Enter unique username"
          onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>

      <div className="mb-2">
        <label className="form-label">Email:</label>
        <input type="email" className="form-control" placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>

      <div className="mb-2">
        <label className="form-label">Contact No:</label>
        <input type="number" className="form-control" placeholder="Enter contact no"
          onChange={(e) => setContactno(e.target.value)} value={contactno} />
      </div>

      <div className="mb-2">
        <label className="form-label">Password:</label>
        <input type="password" className="form-control" placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>

      <div className="mb-3">
        <label className="form-label">User Type:</label>
        <select className="form-select" onChange={(e) => setUrole(e.target.value)} value={urole}>
          <option>Select user type</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-100 fs-5 fw-bold mb-2">Register</button>
      <button type="button" className="btn btn-secondary w-100 fs-6" onClick={() => setIslogin(true)}>
        Already Registered? Login
      </button>
    </form>
  ) : null}

  {/* Login Form */}
  {islogin ? (
    <form className="w-50 mx-auto p-3 shadow-sm rounded-3 bg-light mt-3" onSubmit={loginuser}>
      <div className="mb-2">
        <label className="form-label">Username:</label>
        <input type="text" className="form-control" placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>

      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input type="password" className="form-control" placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>

      <button type="submit" className="btn btn-success w-100 fs-5 fw-bold mb-2">Login</button>
      <button type="button" className="btn btn-secondary w-100 fs-6" onClick={() => setIslogin(false)}>
        New User? Register
      </button>
    </form>
  ) : null}
</div>

  )
}
