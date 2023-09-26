import Hamburger from "../Hamburger/Hamburger";
import "./all.css";
import { useState, useEffect } from "react";
export default function All() {

  const [showDepartments, setShowDepartments] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [showStudents, setShowStudents] = useState(false);


  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchCount() {
      const response = await fetch("http://localhost:8081/departments/count");
      const data = await response.json();
      setCount1(data);
    }
    fetchCount();
  }, []);
  const handleShowDepartments = async () => {
    const response = await fetch("http://localhost:8081/departments");
    const data = await response.json();
    setDepartments(data);
    setShowDepartments(true);
    setShowEmployees(false);
    setShowStudents(false);
  };
  useEffect(() => {
    async function fetchCount() {
      const response = await fetch("http://localhost:8081/count");
      const data = await response.json();
      setCount2(data);
    }
    fetchCount();
  }, []);
  const handleShowemployees = async () => {
    const response = await fetch("http://localhost:8081/employ");
    const data = await response.json();
    setEmployees(data);
    setShowDepartments(false);
    setShowEmployees(true);
    setShowStudents(false);
  };
  useEffect(() => {
    async function fetchCount() {
      const response = await fetch("http://localhost:8081/students/count");
      const data = await response.json();
      setCount3(data);
    }
    fetchCount();
  }, []);
  const handleShowStudents = async () => {
    const response = await fetch("http://localhost:8081/students");
    const data = await response.json();
    setStudents(data);
    setShowDepartments(false);
    setShowEmployees(false);
    setShowStudents(true);
  };
  return (
    <div>
        <Hamburger />
      <div className="details-container">
        <h1 className="main-heading">Dept's Emp's and student's details</h1>
        <table className="details-table">
          <thead>
            <tr>
              <th>Number of departments</th>
              <th>Number of employees</th>
              <th>Number of students</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button className="number-button" onClick={handleShowDepartments}>
                  {count1}
                </button>
              </td>
              <td>
                <button className="number-button" onClick={handleShowemployees}>
                  {count2}
                </button>
              </td>
              <td>
                <button className="number-button" onClick={handleShowStudents}>
                  {count3}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {showDepartments && (
          <div>
            <table className="details-table1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr key={department.id}>
                    <td>{department.id}</td>
                    <td>{department.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showEmployees && (
          <div>
            <table className="details-table1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {/* <th>DepartmentID</th>
          <th>DepartmentName</th> */}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    {/* <td>{employee.department.id}</td>
            <td>{employee.department.name}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showStudents && (
          <div>
            <table className="details-table1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}