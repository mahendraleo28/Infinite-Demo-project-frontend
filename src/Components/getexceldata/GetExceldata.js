import Hamburger from "../Hamburger/Hamburger";
import "./employees.css";
import { useEffect, useState } from "react";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="forhamburgermenuforgetexcel">
        <Hamburger />
      </div>
      <div>
      <h1 className="skjdbfhsbfkhsdbdkhbs"></h1>
      <div className="employee-list-container">
        <h2 className="employee-list-title">EXCEL DATA</h2>
        <h2 className="employee-list-title1">EXCEL DATA</h2>
        <table className="employee-list-table">
          <thead>
            <tr>
              <th className="employee-list-header">ID</th>
              <th className="employee-list-header">First Name</th>
              <th className="employee-list-header">Last Name</th>
              <th className="employee-list-header">Email</th>
              
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="employee-list-row">
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
