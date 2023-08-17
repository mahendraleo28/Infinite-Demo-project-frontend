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
        <table className="employee-list-table">
          <thead>
            <tr>
              <th className="employee-list-header">ID</th>
              <th className="employee-list-header">Name</th>
              <th className="employee-list-header">Email</th>
              <th className="employee-list-header">Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="employee-list-row">
                <td className="employee-list-cell">{employee.id}</td>
                <td className="employee-list-cell">{employee.name}</td>
                <td className="employee-list-cell">{employee.email}</td>
                <td className="employee-list-cell">{employee.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
