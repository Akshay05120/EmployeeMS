import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

export default function AddEmployee() {
    let [isshow, setIsshow] = useState(false);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [department, setDepartment] = useState("");
    let [role, setRole] = useState("");
    let [salary, setSalary] = useState(0.0);
    let [img, setImg] = useState("");
    var navigate=useNavigate("");
   const app = "http://56.228.18.59:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";
//   const app = "http://localhost:8080";

    let handleimg = (e) => {
        const file = e.target.files[0];
        const fullname = `/img/${file.name}`;
        console.log("img address is " + fullname);
        setImg(fullname);
    }

    let addemployee = (e) => {
        e.preventDefault();

        let newEmp = { name, email, department, role, salary, img }; 
        console.log("Sending newUser data:", newEmp);

        axios.post(`${app}/admin/saveemp`, newEmp)
            .then((response) => {
                if (response.data) {
                    alert("Record added successfully");
                }
                setIsshow(false);
                setName('');
                setEmail('');
                setDepartment('');
                setRole('');
                setSalary('');
                navigate("/admindashbord")
            })
            .catch((error) => {
                console.log("Error occurred: " + error);
            });
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6">
                <h3 className="mb-4 text-center">Add Employee</h3>
                <form onSubmit={addemployee} className="p-4 border rounded shadow-lg bg-light">
                    <div className="mb-3">
                        <label className="form-label">Enter Name:</label>
                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Enter Email:</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Enter Department:</label>
                        <input type="text" className="form-control" onChange={(e) => setDepartment(e.target.value)} value={department} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Enter Role:</label>
                        <input type="text" className="form-control" onChange={(e) => setRole(e.target.value)} value={role} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Enter Salary:</label>
                        <input type="number" className="form-control" onChange={(e) => setSalary(parseFloat(e.target.value))} value={salary} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Upload Profile Image:</label>
                        <input type="file" className="form-control" accept="image/*" onChange={handleimg} />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}
