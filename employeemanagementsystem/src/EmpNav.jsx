import React from 'react'
import {useNavigate} from 'react-router-dom'
import './App.css';

export default function EmpNav() {
  let navigate=useNavigate();
  let handlelogout=()=>{
    localStorage.removeItem("userdata");
    navigate("/");
  }
  
  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div className="container">
      {/* Brand Name */}
      <a className="navbar-brand fw-bold fs-4" href="#">Hefshine</a>

      {/* Responsive Toggle Button */}
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

      {/* Navbar Items */}
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {/* Left Section (can be expanded later) */}
        <ul className="navbar-nav">
          {/* Add more items here if needed */}
        </ul>

        {/* Logout Button - Aligned Right */}
        <button className="btn btn-danger fw-bold px-4" onClick={handlelogout}>Logout</button>
      </div>
    </div>
  </nav>
</div>


  )
}
