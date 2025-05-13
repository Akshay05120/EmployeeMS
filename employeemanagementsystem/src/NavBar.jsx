import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css';

export default function NavBar() {
  let navigate=useNavigate();
  let handlelogout=()=>{
    localStorage.removeItem("userdata");
    navigate("/");
  }
  
  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container">
      <a className="navbar-brand fw-bold" href="#">Hefshine</a>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/addemp" className="nav-link fw-bold text-light">Add Employee</Link>
          </li>
        </ul>

        <button className="btn btn-danger" onClick={handlelogout}>Logout</button>
      </div>
    </div>
  </nav>
</div>

  )
}
