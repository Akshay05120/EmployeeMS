import './App.css';
import AdminDash from './AdminDash';
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployee from './AddEmployee';
import {Routes,Route } from 'react-router-dom';
import EmployeeDash from './EmployeeDash';
import RegisterUser from './RegisterUser';

function App() {
  return (
    <center>
    <div>
    <Routes>
        <Route path="/" element={<RegisterUser></RegisterUser>}></Route>
        <Route path="/addemp" element={<AddEmployee></AddEmployee>}></Route>
        <Route path="/admindashbord" element={<AdminDash></AdminDash>}></Route>
        <Route path="/employeedashbord" element={<EmployeeDash/>}></Route>
      </Routes>
      
    </div>
    </center>
  );
}

export default App;
